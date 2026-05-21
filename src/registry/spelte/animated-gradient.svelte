<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	type PatternShape = 'Checks' | 'Stripes' | 'Edge';
	type PresetName = 'Prism' | 'Lava' | 'Plasma' | 'Pulse' | 'Vortex' | 'Mist';

	interface PresetColors {
		color1: string;
		color2: string;
		color3: string;
	}

	interface PresetParams extends PresetColors {
		rotation: number;
		proportion: number;
		scale: number;
		speed: number;
		distortion: number;
		swirl: number;
		swirlIterations: number;
		softness: number;
		offset: number;
		shape: PatternShape;
		shapeSize: number;
		lightColors?: PresetColors;
	}

	type GradientConfig =
		| ({ preset: 'custom' } & Partial<PresetParams> & Pick<PresetParams, 'color1' | 'color2' | 'color3'>)
		| { preset?: PresetName; speed?: number };

	interface NoiseConfig {
		opacity: number;
		scale?: number;
	}

	const patternShapes: Record<PatternShape, number> = {
		Checks: 0,
		Stripes: 1,
		Edge: 2
	};

	const presets: Record<PresetName, PresetParams> = {
		Prism: {
			color1: '#050505',
			color2: '#66B3FF',
			color3: '#FFFFFF',
			lightColors: {
				color1: '#FAFAFA',
				color2: '#66B3FF',
				color3: '#050505'
			},
			rotation: -50,
			proportion: 1,
			scale: 0.01,
			speed: 30,
			distortion: 0,
			swirl: 50,
			swirlIterations: 16,
			softness: 47,
			offset: -299,
			shape: 'Checks',
			shapeSize: 45
		},
		Lava: {
			color1: '#FF9F21',
			color2: '#FF0303',
			color3: '#000000',
			lightColors: {
				color1: '#FF9F21',
				color2: '#FF0303',
				color3: '#FAFAFA'
			},
			rotation: 114,
			proportion: 100,
			scale: 0.52,
			speed: 30,
			distortion: 7,
			swirl: 18,
			swirlIterations: 20,
			softness: 100,
			offset: 717,
			shape: 'Edge',
			shapeSize: 12
		},
		Plasma: {
			color1: '#B566FF',
			color2: '#000000',
			color3: '#000000',
			lightColors: {
				color1: '#B566FF',
				color2: '#FAFAFA',
				color3: '#FAFAFA'
			},
			rotation: 0,
			proportion: 63,
			scale: 0.75,
			speed: 30,
			distortion: 5,
			swirl: 61,
			swirlIterations: 5,
			softness: 100,
			offset: -168,
			shape: 'Checks',
			shapeSize: 28
		},
		Pulse: {
			color1: '#66FF85',
			color2: '#000000',
			color3: '#000000',
			lightColors: {
				color1: '#66FF85',
				color2: '#FAFAFA',
				color3: '#FAFAFA'
			},
			rotation: -167,
			proportion: 92,
			scale: 0,
			speed: 20,
			distortion: 54,
			swirl: 75,
			swirlIterations: 3,
			softness: 28,
			offset: -813,
			shape: 'Checks',
			shapeSize: 79
		},
		Vortex: {
			color1: '#000000',
			color2: '#FFFFFF',
			color3: '#000000',
			lightColors: {
				color1: '#FAFAFA',
				color2: '#000000',
				color3: '#FAFAFA'
			},
			rotation: 50,
			proportion: 41,
			scale: 0.4,
			speed: 20,
			distortion: 0,
			swirl: 100,
			swirlIterations: 3,
			softness: 5,
			offset: -744,
			shape: 'Stripes',
			shapeSize: 80
		},
		Mist: {
			color1: '#050505',
			color2: '#FF66B8',
			color3: '#050505',
			lightColors: {
				color1: '#FAFAFA',
				color2: '#FF66B8',
				color3: '#FAFAFA'
			},
			rotation: 0,
			proportion: 33,
			scale: 0.48,
			speed: 39,
			distortion: 4,
			swirl: 65,
			swirlIterations: 5,
			softness: 100,
			offset: -235,
			shape: 'Edge',
			shapeSize: 48
		}
	};

	let {
		style,
		class: className,
		config = { preset: 'Prism' },
		noise,
		radius = '0px'
	}: {
		style?: string;
		class?: string;
		config?: GradientConfig;
		noise?: NoiseConfig;
		radius?: string;
	} = $props();

	let container: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let animationId: number | undefined;
	let resizeObserver: ResizeObserver | undefined;
	let isLightTheme = $state(false);

	const params = $derived.by((): PresetParams => {
		if (config.preset === 'custom') {
			return {
				color1: config.color1,
				color2: config.color2,
				color3: config.color3,
				rotation: config.rotation ?? 0,
				proportion: config.proportion ?? 35,
				scale: config.scale ?? 1,
				speed: config.speed ?? 25,
				distortion: config.distortion ?? 12,
				swirl: config.swirl ?? 80,
				swirlIterations: config.swirlIterations ?? 10,
				softness: config.softness ?? 100,
				offset: config.offset ?? 0,
				shape: config.shape ?? 'Checks',
				shapeSize: config.shapeSize ?? 10
			};
		}

		const preset = presets[config.preset ?? 'Prism'];
		return {
			...preset,
			...(isLightTheme && preset.lightColors ? preset.lightColors : null),
			speed: config.speed ?? preset.speed
		};
	});

	function resize(gl: WebGL2RenderingContext) {
		const width = container.clientWidth;
		const height = container.clientHeight;
		const pixelRatio = window.devicePixelRatio || 1;
		canvas.width = width * pixelRatio;
		canvas.height = height * pixelRatio;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
		gl.viewport(0, 0, canvas.width, canvas.height);
	}

	onMount(() => {
		const updateTheme = () => {
			isLightTheme = !document.documentElement.classList.contains('dark');
		};
		updateTheme();

		const themeObserver = new MutationObserver(updateTheme);
		themeObserver.observe(document.documentElement, {
			attributeFilter: ['class'],
			attributes: true
		});

		const gl = canvas.getContext('webgl2', {
			premultipliedAlpha: true,
			alpha: true,
			antialias: true
		});
		if (!gl) return;
		const context = gl;

		const vertexShader = context.createShader(context.VERTEX_SHADER)!;
		context.shaderSource(
			vertexShader,
			`#version 300 es
			in vec4 a_position;
			void main() {
				gl_Position = a_position;
			}`
		);
		context.compileShader(vertexShader);

		const fragmentShader = context.createShader(context.FRAGMENT_SHADER)!;
		context.shaderSource(fragmentShader, fragmentShaderSource);
		context.compileShader(fragmentShader);

		const program = context.createProgram()!;
		context.attachShader(program, vertexShader);
		context.attachShader(program, fragmentShader);
		context.linkProgram(program);
		context.useProgram(program);

		const positionBuffer = context.createBuffer();
		context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
		context.bufferData(
			context.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			context.STATIC_DRAW
		);

		const positionLocation = context.getAttribLocation(program, 'a_position');
		context.enableVertexAttribArray(positionLocation);
		context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);

		const uniforms = {
			u_time: context.getUniformLocation(program, 'u_time'),
			u_resolution: context.getUniformLocation(program, 'u_resolution'),
			u_pixelRatio: context.getUniformLocation(program, 'u_pixelRatio'),
			u_scale: context.getUniformLocation(program, 'u_scale'),
			u_rotation: context.getUniformLocation(program, 'u_rotation'),
			u_color1: context.getUniformLocation(program, 'u_color1'),
			u_color2: context.getUniformLocation(program, 'u_color2'),
			u_color3: context.getUniformLocation(program, 'u_color3'),
			u_proportion: context.getUniformLocation(program, 'u_proportion'),
			u_softness: context.getUniformLocation(program, 'u_softness'),
			u_shape: context.getUniformLocation(program, 'u_shape'),
			u_shapeScale: context.getUniformLocation(program, 'u_shapeScale'),
			u_distortion: context.getUniformLocation(program, 'u_distortion'),
			u_swirl: context.getUniformLocation(program, 'u_swirl'),
			u_swirlIterations: context.getUniformLocation(program, 'u_swirlIterations')
		};

		resize(context);
		resizeObserver = new ResizeObserver(() => resize(context));
		resizeObserver.observe(container);
		const startTime = performance.now();

		function animate(time: number) {
			const elapsed = (time - startTime) / 1000;
			const speed = (params.speed / 100) * 5;

			context.uniform1f(uniforms.u_time, elapsed * speed + params.offset * 0.01);
			context.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
			context.uniform1f(uniforms.u_pixelRatio, window.devicePixelRatio || 1);
			context.uniform1f(uniforms.u_scale, params.scale);
			context.uniform1f(uniforms.u_rotation, (params.rotation * Math.PI) / 180);

			const c1 = hexToRgba(params.color1);
			const c2 = hexToRgba(params.color2);
			const c3 = hexToRgba(params.color3);
			context.uniform4f(uniforms.u_color1, c1[0], c1[1], c1[2], c1[3]);
			context.uniform4f(uniforms.u_color2, c2[0], c2[1], c2[2], c2[3]);
			context.uniform4f(uniforms.u_color3, c3[0], c3[1], c3[2], c3[3]);
			context.uniform1f(uniforms.u_proportion, params.proportion / 100);
			context.uniform1f(uniforms.u_softness, params.softness / 100);
			context.uniform1f(uniforms.u_shape, patternShapes[params.shape]);
			context.uniform1f(uniforms.u_shapeScale, params.shapeSize / 100);
			context.uniform1f(uniforms.u_distortion, params.distortion / 50);
			context.uniform1f(uniforms.u_swirl, params.swirl / 100);
			context.uniform1f(
				uniforms.u_swirlIterations,
				params.swirl === 0 ? 0 : params.swirlIterations
			);

			context.drawArrays(context.TRIANGLES, 0, 6);
			animationId = requestAnimationFrame(animate);
		}

		animationId = requestAnimationFrame(animate);

		return () => {
			if (animationId !== undefined) cancelAnimationFrame(animationId);
			resizeObserver?.disconnect();
			themeObserver.disconnect();
			context.deleteProgram(program);
			context.deleteShader(vertexShader);
			context.deleteShader(fragmentShader);
			context.deleteBuffer(positionBuffer);
		};
	});

	onDestroy(() => {
		if (animationId !== undefined) cancelAnimationFrame(animationId);
		resizeObserver?.disconnect();
	});

	function hexToRgba(hex: string): [number, number, number, number] {
		let r = 0;
		let g = 0;
		let b = 0;
		let a = 1;

		if (hex.startsWith('rgba(')) {
			const parts = hex.slice(5, -1).split(',');
			r = parseInt(parts[0]) / 255;
			g = parseInt(parts[1]) / 255;
			b = parseInt(parts[2]) / 255;
			a = parseFloat(parts[3]);
		} else if (hex.startsWith('rgb(')) {
			const parts = hex.slice(4, -1).split(',');
			r = parseInt(parts[0]) / 255;
			g = parseInt(parts[1]) / 255;
			b = parseInt(parts[2]) / 255;
		} else if (hex.startsWith('hsla(') || hex.startsWith('hsl(')) {
			const isHsla = hex.startsWith('hsla(');
			const parts = hex.slice(isHsla ? 5 : 4, -1).split(',');
			const h = parseFloat(parts[0]) / 360;
			const s = parseFloat(parts[1]) / 100;
			const l = parseFloat(parts[2]) / 100;
			a = isHsla ? parseFloat(parts[3]) : 1;
			[r, g, b] = hslToRgb(h, s, l);
		} else if (hex.startsWith('#')) {
			const c = hex.slice(1);
			if (c.length === 3) {
				r = parseInt(c[0] + c[0], 16) / 255;
				g = parseInt(c[1] + c[1], 16) / 255;
				b = parseInt(c[2] + c[2], 16) / 255;
			} else if (c.length >= 6) {
				r = parseInt(c.slice(0, 2), 16) / 255;
				g = parseInt(c.slice(2, 4), 16) / 255;
				b = parseInt(c.slice(4, 6), 16) / 255;
				if (c.length === 8) a = parseInt(c.slice(6, 8), 16) / 255;
			}
		}

		return [r, g, b, a];
	}

	function hslToRgb(h: number, s: number, l: number): [number, number, number] {
		let r: number;
		let g: number;
		let b: number;

		if (s === 0) {
			r = g = b = l;
		} else {
			const hueToRgb = (p: number, q: number, t: number) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};

			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r = hueToRgb(p, q, h + 1 / 3);
			g = hueToRgb(p, q, h);
			b = hueToRgb(p, q, h - 1 / 3);
		}

		return [r, g, b];
	}

	const fragmentShaderSource = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
	return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
	return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
	vec2 i = floor(st);
	vec2 f = fract(st);
	float a = random(i);
	float b = random(i + vec2(1.0, 0.0));
	float c = random(i + vec2(0.0, 1.0));
	float d = random(i + vec2(1.0, 1.0));
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
	vec3 color1 = c1.rgb * c1.a;
	vec3 color2 = c2.rgb * c2.a;
	vec3 color3 = c3.rgb * c3.a;
	float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
	float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);
	vec3 blended_color_2 = mix(color1, color2, r1);
	float blended_opacity_2 = mix(c1.a, c2.a, r1);
	vec3 c = mix(blended_color_2, color3, r2);
	float o = mix(blended_opacity_2, c3.a, r2);
	return vec4(c, o);
}

void main() {
	vec2 uv = gl_FragCoord.xy / u_resolution.xy;
	float t = .5 * u_time;
	float noise_scale = .0005 + .006 * u_scale;
	uv -= .5;
	uv *= (noise_scale * u_resolution);
	uv = rotate(uv, u_rotation * .5 * PI);
	uv /= u_pixelRatio;
	uv += .5;
	float n1 = noise(uv * 1. + t);
	float n2 = noise(uv * 2. - t);
	float angle = n1 * TWO_PI;
	uv.x += 4. * u_distortion * n2 * cos(angle);
	uv.y += 4. * u_distortion * n2 * sin(angle);
	float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
	for (float i = 1.; i <= iterations_number; i++) {
		uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
		uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
	}
	float proportion = clamp(u_proportion, 0., 1.);
	float shape = 0.;
	float mixer = 0.;
	if (u_shape < .5) {
		vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
		shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
		mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
	} else if (u_shape < 1.5) {
		vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
		float f = fract(stripes_shape_uv.y);
		shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
		mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
	} else {
		float sh = 1. - uv.y;
		sh -= .5;
		sh /= (noise_scale * u_resolution.y);
		sh += .5;
		float shape_scaling = .2 * (1. - u_shapeScale);
		shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
		mixer = shape;
	}
	vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
	fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;
</script>

<div
	bind:this={container}
	class="absolute inset-0 {className ?? ''}"
	style="z-index: -1; border-radius: {radius}; overflow: hidden; {style ?? ''}"
>
	<canvas bind:this={canvas} style="display: block; width: 100%; height: 100%;"></canvas>
	{#if noise && noise.opacity > 0}
		<div
			class="absolute inset-0 pointer-events-none"
			style='background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMCCgkGBAVJOAVJAAAASklEQVQ4y2NgGAWjYBSMglEwCgY/YGRgZBQUYmJiZGQEkYwMjIyMgoKCjIyMIJKBgRFIMjIyAklGRkYGRkFBYEcwMDIyMjAOUQAA1I4HwVwZAkYAAAAASUVORK5CYII="); background-size: {(noise.scale ?? 1) * 200}px; opacity: {noise.opacity / 2};'
		></div>
	{/if}
</div>
