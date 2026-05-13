<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	type Preset = 'Prism' | 'Ocean' | 'Sunset' | 'Forest' | 'Aurora';

	const PRESETS: Record<Preset, [string, string, string]> = {
		Prism: ['#6366f1', '#ec4899', '#f59e0b'],
		Ocean: ['#0ea5e9', '#06b6d4', '#3b82f6'],
		Sunset: ['#f97316', '#ef4444', '#f59e0b'],
		Forest: ['#22c55e', '#16a34a', '#84cc16'],
		Aurora: ['#a855f7', '#6366f1', '#06b6d4'],
	};

	let {
		style,
		class: className,
		config = {},
	}: {
		style?: string;
		class?: string;
		config?: { preset?: Preset; colors?: [string, string, string] };
	} = $props();

	let canvas: HTMLCanvasElement;
	let animationId: number;
	let startTime = Date.now();

	function hexToRgb(hex: string): [number, number, number] {
		const m = hex.replace('#', '').match(/.{2}/g);
		if (!m) return [1, 1, 1];
		return [parseInt(m[0], 16) / 255, parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255];
	}

	onMount(() => {
		const gl = canvas.getContext('webgl');
		if (!gl) return;

		const vert = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0, 1); }
    `;
		const frag = `
      precision mediump float;
      uniform float u_t;
      uniform vec2 u_res;
      uniform vec3 u_c1, u_c2, u_c3;
      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        float s1 = sin(uv.x * 3.0 + u_t * 0.5) * 0.5 + 0.5;
        float s2 = sin(uv.y * 2.5 - u_t * 0.3) * 0.5 + 0.5;
        float s3 = sin((uv.x + uv.y) * 2.0 + u_t * 0.4) * 0.5 + 0.5;
        float w1 = s1 * s2, w2 = s2 * s3, w3 = s1 * s3;
        float sum = w1 + w2 + w3 + 0.001;
        vec3 col = (u_c1 * w1 + u_c2 * w2 + u_c3 * w3) / sum;
        gl_FragColor = vec4(col, 1.0);
      }
    `;

		function makeShader(type: number, src: string) {
			const s = gl!.createShader(type)!;
			gl!.shaderSource(s, src);
			gl!.compileShader(s);
			return s;
		}

		const prog = gl.createProgram()!;
		gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, vert));
		gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, frag));
		gl.linkProgram(prog);
		gl.useProgram(prog);

		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
		const pos = gl.getAttribLocation(prog, 'a_pos');
		gl.enableVertexAttribArray(pos);
		gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

		function render() {
			if (!canvas) return;
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
			gl!.viewport(0, 0, canvas.width, canvas.height);

			const t = (Date.now() - startTime) / 1000;
			const colors = config.colors ?? PRESETS[config.preset ?? 'Prism'];
			const [c1, c2, c3] = colors.map(hexToRgb);
			gl!.uniform1f(gl!.getUniformLocation(prog, 'u_t'), t);
			gl!.uniform2f(gl!.getUniformLocation(prog, 'u_res'), canvas.width, canvas.height);
			gl!.uniform3fv(gl!.getUniformLocation(prog, 'u_c1'), c1);
			gl!.uniform3fv(gl!.getUniformLocation(prog, 'u_c2'), c2);
			gl!.uniform3fv(gl!.getUniformLocation(prog, 'u_c3'), c3);
			gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
			animationId = requestAnimationFrame(render);
		}
		render();
	});

	onDestroy(() => {
		if (animationId) cancelAnimationFrame(animationId);
	});
</script>

<div class="absolute inset-0 {className ?? ''}" style={style}>
	<canvas bind:this={canvas} class="absolute inset-0 w-full h-full"></canvas>
</div>
