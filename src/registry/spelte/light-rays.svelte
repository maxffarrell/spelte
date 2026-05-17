<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	type RaysColor =
		| { mode: 'single'; color: string }
		| { mode: 'multi'; color1: string; color2: string }
		| { mode: 'random' };

	let {
		intensity = 13,
		rays = 32,
		reach = 16,
		position = 50,
		radius = '0px',
		backgroundColor = '#000',
		animation = { animate: true, speed: 10 },
		raysColor = { mode: 'single', color: '#639AFF' } as RaysColor,
		style,
		class: className
	}: {
		intensity?: number;
		rays?: number;
		reach?: number;
		position?: number;
		radius?: string;
		backgroundColor?: string;
		animation?: { animate: boolean; speed: number };
		raysColor?: RaysColor;
		style?: string;
		class?: string;
	} = $props();

	const rayYPosition1 = -0.4;
	const rayYPosition2 = -0.5;

	let canvas: HTMLCanvasElement;
	let animationId: number | undefined;
	let program: WebGLProgram | undefined;
	let gl: WebGLRenderingContext | null = null;
	let uniforms: Record<string, WebGLUniformLocation | null> = {};

	const randomColors = $state({
		color1: hslToRgb(Math.random() * 360, 60 + Math.random() * 40, 50),
		color2: hslToRgb(Math.random() * 360, 60 + Math.random() * 40, 65)
	});

	const colorRgb = $derived.by((): [[number, number, number], [number, number, number]] => {
		if (raysColor.mode === 'random') return [randomColors.color1, randomColors.color2];
		if (raysColor.mode === 'multi') return [colorToRgb(raysColor.color1), colorToRgb(raysColor.color2)];
		const color = colorToRgb(raysColor.color);
		return [color, color];
	});

	function resize() {
		if (!gl || !canvas) return;
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		gl.viewport(0, 0, canvas.width, canvas.height);
	}

	function setUniforms(time: number) {
		if (!gl) return;
		gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
		gl.uniform1f(uniforms.u_time, time);
		gl.uniform3fv(uniforms.u_color1, colorRgb[0]);
		gl.uniform3fv(uniforms.u_color2, colorRgb[1]);
		gl.uniform1f(uniforms.u_intensity, mapRange(intensity, 0, 100, 0, 0.5));
		gl.uniform1f(uniforms.u_rays, mapRange(rays, 0, 100, 0, 0.3));
		gl.uniform1f(uniforms.u_reach, mapRange(reach, 0, 100, 0, 0.5));
		gl.uniform2f(
			uniforms.u_rayPos1,
			(position / 100) * canvas.width,
			rayYPosition1 * canvas.height
		);
		gl.uniform2f(
			uniforms.u_rayPos2,
			(position / 100 + 0.02) * canvas.width,
			rayYPosition2 * canvas.height
		);
	}

	onMount(() => {
		gl = canvas.getContext('webgl', {
			preserveDrawingBuffer: true,
			premultipliedAlpha: true,
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance'
		});
		if (!gl) return;

		const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
		gl.shaderSource(vertexShader, vertexShaderSource);
		gl.compileShader(vertexShader);

		const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
		gl.shaderSource(fragmentShader, fragmentShaderSource);
		gl.compileShader(fragmentShader);

		program = gl.createProgram()!;
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		gl.useProgram(program);

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
		const positionLocation = gl.getAttribLocation(program, 'a_position');
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		uniforms = {
			u_resolution: gl.getUniformLocation(program, 'u_resolution'),
			u_time: gl.getUniformLocation(program, 'u_time'),
			u_color1: gl.getUniformLocation(program, 'u_color1'),
			u_color2: gl.getUniformLocation(program, 'u_color2'),
			u_intensity: gl.getUniformLocation(program, 'u_intensity'),
			u_rays: gl.getUniformLocation(program, 'u_rays'),
			u_reach: gl.getUniformLocation(program, 'u_reach'),
			u_rayPos1: gl.getUniformLocation(program, 'u_rayPos1'),
			u_rayPos2: gl.getUniformLocation(program, 'u_rayPos2')
		};

		resize();
		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(canvas);

		let currentTime = Math.random() * 10000;
		let lastTime = 0;
		function render(time: number) {
			resize();
			const delta = time - lastTime;
			lastTime = time;
			if (animation.animate) currentTime += (delta * animation.speed) / 1000 / 10;
			setUniforms(currentTime);
			gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
			animationId = requestAnimationFrame(render);
		}
		animationId = requestAnimationFrame(render);

		return () => {
			if (animationId !== undefined) cancelAnimationFrame(animationId);
			resizeObserver.disconnect();
			gl?.deleteProgram(program ?? null);
			gl?.deleteShader(vertexShader);
			gl?.deleteShader(fragmentShader);
			gl?.deleteBuffer(buffer);
		};
	});

	onDestroy(() => {
		if (animationId !== undefined) cancelAnimationFrame(animationId);
	});

	function colorToRgb(hex: string): [number, number, number] {
		if (hex.startsWith('rgb(') || hex.startsWith('rgba(')) {
			const parts = hex.slice(hex.indexOf('(') + 1, -1).split(',');
			return [parseInt(parts[0]) / 255, parseInt(parts[1]) / 255, parseInt(parts[2]) / 255];
		}
		const c = hex.replace('#', '');
		if (c.length === 3) {
			return [
				parseInt(c[0] + c[0], 16) / 255,
				parseInt(c[1] + c[1], 16) / 255,
				parseInt(c[2] + c[2], 16) / 255
			];
		}
		return [
			parseInt(c.slice(0, 2), 16) / 255,
			parseInt(c.slice(2, 4), 16) / 255,
			parseInt(c.slice(4, 6), 16) / 255
		];
	}

	function hslToRgb(h: number, s: number, l: number): [number, number, number] {
		s /= 100;
		l /= 100;
		const c = (1 - Math.abs(2 * l - 1)) * s;
		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		const m = l - c / 2;
		let r = 0;
		let g = 0;
		let b = 0;
		if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
		else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
		else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
		else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
		else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
		else if (h >= 300 && h < 360) [r, g, b] = [c, 0, x];
		return [r + m, g + m, b + m];
	}

	function mapRange(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) {
		const percentage = (value - fromLow) / (fromHigh - fromLow);
		return toLow + percentage * (toHigh - toLow);
	}

	const vertexShaderSource = `
attribute vec2 a_position;
void main() {
	gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

	const fragmentShaderSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform float u_intensity;
uniform float u_rays;
uniform float u_reach;
uniform vec2 u_rayPos1;
uniform vec2 u_rayPos2;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
	vec2 sourceToCoord = coord - raySource;
	float cosAngle = dot(normalize(sourceToCoord), rayRefDirection);
	float diagonal = length(u_resolution);
	return clamp((.45 + 0.15 * sin(cosAngle * seedA + u_time * speed)) + (0.3 + 0.2 * cos(-cosAngle * seedB + u_time * speed)), u_reach, 1.0) * clamp((diagonal - length(sourceToCoord)) / diagonal, u_reach, 1.0);
}

void main() {
	vec2 coord = vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y);
	float speed = u_rays * 10.0;
	vec2 rayRefDir1 = normalize(vec2(1.0, -0.116));
	vec2 rayRefDir2 = normalize(vec2(1.0, 0.241));
	float strength1 = rayStrength(u_rayPos1, rayRefDir1, coord, 36.2214 * speed, 21.11349 * speed, 1.5 * speed);
	float strength2 = rayStrength(u_rayPos2, rayRefDir2, coord, 22.39910 * speed, 18.0234 * speed, 1.1 * speed);
	float brightness = 1.0 * u_reach - (coord.y / u_resolution.y);
	float attenuation = clamp(brightness + (0.5 + u_intensity), 0.0, 1.0);
	float alpha1 = strength1 * attenuation;
	float alpha2 = strength2 * attenuation;
	vec3 premultColor1 = u_color1 * alpha1;
	vec3 premultColor2 = u_color2 * alpha2;
	vec3 blendedColor = premultColor1 + premultColor2;
	float blendedAlpha = alpha1 + alpha2 * (1.0 - alpha1);
	vec3 finalRGB = blendedColor / max(blendedAlpha, 0.0001);
	gl_FragColor = vec4(finalRGB * blendedAlpha, blendedAlpha);
}
`;
</script>

<div
	class="absolute inset-0 {className ?? ''}"
	style="z-index: -1; border-radius: {radius}; overflow: hidden; background-color: {backgroundColor}; {style ?? ''}"
>
	<canvas bind:this={canvas} class="block h-full w-full"></canvas>
</div>
