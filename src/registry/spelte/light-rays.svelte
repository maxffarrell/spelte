<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type RaysColor =
		| { mode: 'single'; color: string }
		| { mode: 'multi'; color1: string; color2: string };

	let {
		backgroundColor = 'var(--background)',
		raysColor = { mode: 'single', color: '#ffffff' } as RaysColor,
		style,
		class: className,
	}: {
		backgroundColor?: string;
		raysColor?: RaysColor;
		style?: string;
		class?: string;
	} = $props();

	let canvas: HTMLCanvasElement;
	let animationId: number;
	let gl: WebGLRenderingContext | null = null;
	let program: WebGLProgram | null = null;
	let startTime = Date.now();

	const vert = `
    attribute vec2 a_position;
    void main() { gl_Position = vec4(a_position, 0, 1); }
  `;

	const frag = `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform int u_multiColor;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      float cx = 0.5, cy = -0.1;
      float dx = uv.x - cx, dy = uv.y - cy;
      float angle = atan(dx, dy);
      float dist = length(vec2(dx, dy));

      float rays = 0.0;
      for (int i = 0; i < 8; i++) {
        float offset = float(i) * 0.785398 + hash(vec2(float(i), 0.0)) * 1.5;
        float w = 0.04 + hash(vec2(float(i), 1.0)) * 0.06;
        float a = mod(angle - offset - u_time * 0.08 * (hash(vec2(float(i), 2.0)) - 0.5) * 2.0, 6.28318) - 3.14159;
        rays += smoothstep(w, 0.0, abs(a)) * smoothstep(0.0, 0.5, 1.0 - dist);
      }

      vec3 color = u_multiColor == 1 ? mix(u_color1, u_color2, rays) : u_color1;
      gl_FragColor = vec4(color * rays, rays * 0.6);
    }
  `;

	function hexToRgb(hex: string): [number, number, number] {
		const m = hex.replace('#', '').match(/.{2}/g);
		if (!m) return [1, 1, 1];
		return [parseInt(m[0], 16) / 255, parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255];
	}

	onMount(() => {
		gl = canvas.getContext('webgl');
		if (!gl) return;

		const vs = gl.createShader(gl.VERTEX_SHADER)!;
		gl.shaderSource(vs, vert);
		gl.compileShader(vs);

		const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
		gl.shaderSource(fs, frag);
		gl.compileShader(fs);

		program = gl.createProgram()!;
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		gl.useProgram(program);

		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
			gl.STATIC_DRAW
		);

		const pos = gl.getAttribLocation(program, 'a_position');
		gl.enableVertexAttribArray(pos);
		gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		function render() {
			if (!gl || !program || !canvas) return;
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			canvas.width = w;
			canvas.height = h;
			gl.viewport(0, 0, w, h);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);

			const t = (Date.now() - startTime) / 1000;
			gl.uniform1f(gl.getUniformLocation(program, 'u_time'), t);
			gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), w, h);

			const c1 =
				raysColor.mode === 'multi'
					? hexToRgb(raysColor.color1)
					: hexToRgb((raysColor as { color: string }).color);
			const c2 = raysColor.mode === 'multi' ? hexToRgb(raysColor.color2) : c1;
			gl.uniform3fv(gl.getUniformLocation(program, 'u_color1'), c1);
			gl.uniform3fv(gl.getUniformLocation(program, 'u_color2'), c2);
			gl.uniform1i(gl.getUniformLocation(program, 'u_multiColor'), raysColor.mode === 'multi' ? 1 : 0);

			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			animationId = requestAnimationFrame(render);
		}
		render();
	});

	onDestroy(() => {
		if (animationId) cancelAnimationFrame(animationId);
		if (gl && program) gl.deleteProgram(program);
	});
</script>

<div
	class="absolute inset-0 {className ?? ''}"
	style="background-color: {backgroundColor}; {style ?? ''}"
>
	<canvas bind:this={canvas} class="absolute inset-0 w-full h-full"></canvas>
</div>
