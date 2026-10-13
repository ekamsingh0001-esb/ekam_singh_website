import React, { useEffect, useRef } from 'react';

interface FluidShaderCanvasProps {
  className?: string;
}

export const FluidShaderCanvas: React.FC<FluidShaderCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance',
      }) || (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    } catch (e) {
      console.warn('WebGL initialization exception, using fallback backdrop:', e);
      return;
    }

    if (!gl) {
      console.warn('WebGL not supported on this device/browser, using fallback backdrop.');
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        // Invert Y for correct WebGL texture space
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Fluid displacement, organic simplex noise, pointer velocity, and RGB chromatic aberration
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec2 u_prev_mouse;
      uniform vec2 u_velocity;
      uniform vec4 u_ripples[5]; // x, y, start_time, strength

      // Simplex 2D noise implementation
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Domain warping FBM
      float fbm(vec2 p) {
        float total = 0.0;
        float amp = 0.5;
        float freq = 1.0;
        for (int i = 0; i < 4; i++) {
          total += snoise(p * freq) * amp;
          freq *= 2.1;
          amp *= 0.5;
        }
        return total;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = uv;
        p.x *= aspect;
        
        vec2 m = u_mouse;
        m.x *= aspect;

        // Base organic flow with enhanced velocity and turbulence
        float t = u_time * 0.28;
        vec2 q = vec2(
          fbm(p * 1.6 + vec2(t * 0.45, t * 0.35)),
          fbm(p * 1.6 + vec2(t * 0.25, -t * 0.55))
        );

        vec2 r = vec2(
          fbm(p * 2.2 + 3.2 * q + vec2(1.7, 9.2) + 0.22 * t),
          fbm(p * 2.2 + 3.2 * q + vec2(8.3, 2.8) + 0.18 * t)
        );

        float organicFluid = fbm(p + 3.6 * r);

        // Pointer fluid interaction & wake distortion
        float mouseDist = length(p - m);
        float mouseRadius = 0.46;
        float mouseInfluence = smoothstep(mouseRadius, 0.0, mouseDist);
        
        // Fluid displacement direction from velocity and mouse center
        vec2 mouseDir = normalize(p - m + vec2(0.0001));
        float speed = length(u_velocity);
        vec2 mouseDisp = (mouseDir * 0.14 + u_velocity * 0.7) * mouseInfluence * (1.3 + speed * 4.0);

        // Click / Tap Liquid Expanding Ripples
        vec2 rippleDisp = vec2(0.0);
        for (int i = 0; i < 5; i++) {
          if (u_ripples[i].w > 0.01) {
            vec2 ripPos = u_ripples[i].xy;
            ripPos.x *= aspect;
            float ripAge = u_time - u_ripples[i].z;
            if (ripAge >= 0.0 && ripAge < 2.5) {
              float d = length(p - ripPos);
              float waveRadius = ripAge * 0.85;
              float waveDist = abs(d - waveRadius);
              float waveAmp = smoothstep(0.18, 0.0, waveDist) * exp(-ripAge * 1.3) * u_ripples[i].w;
              vec2 waveDir = normalize(p - ripPos + vec2(0.0001));
              rippleDisp += waveDir * sin(waveDist * 36.0 - ripAge * 16.0) * waveAmp * 0.16;
            }
          }
        }

        // Total liquid displacement
        vec2 totalDisp = (r * 0.09 + mouseDisp + rippleDisp);

        // Chromatic Aberration & RGB Channel Splitting
        float splitOffset = 0.032 * (mouseInfluence * 3.2 + length(rippleDisp) * 6.0 + 0.28);
        vec2 uv_r = uv + totalDisp * 1.6 + vec2(splitOffset, splitOffset * 0.6);
        vec2 uv_g = uv + totalDisp * 1.1;
        vec2 uv_b = uv + totalDisp * 0.7 - vec2(splitOffset * 0.9, -splitOffset * 0.5);

        // Deep dark obsidian background
        vec3 bg = vec3(0.015, 0.018, 0.03); 
        // Electric Indigo/Violet: #6366f1
        vec3 colorIndigo = vec3(0.38, 0.40, 0.94);
        // Radiant Cyan Accent: #00e5ff
        vec3 colorCyan = vec3(0.06, 0.80, 0.94);
        // Deep Violet / Magenta: #9d4edd
        vec3 colorViolet = vec3(0.62, 0.28, 0.92);
        // Pure electric crystalline light
        vec3 colorHighlight = vec3(0.65, 0.92, 1.0);

        // Sample channels based on displaced coordinates
        float valR = fbm(uv_r * 2.6 + q);
        float valG = fbm(uv_g * 2.6 + q);
        float valB = fbm(uv_b * 2.6 + q);

        vec3 col = bg;
        // Blend fluid layers (calibrated for high text readability & contrast)
        col += colorIndigo * smoothstep(0.08, 0.75, valR) * 0.38;
        col += colorCyan * smoothstep(0.14, 0.78, valG) * 0.44;
        col += colorViolet * smoothstep(0.10, 0.82, valB) * 0.35;

        // Dynamic luminous filament ridges
        float ridgeCyan = 1.0 - abs(valG - 0.48) * 2.2;
        float ridgeIndigo = 1.0 - abs(valR - 0.52) * 2.2;
        col += colorCyan * pow(clamp(ridgeCyan, 0.0, 1.0), 3.0) * 0.28;
        col += colorViolet * pow(clamp(ridgeIndigo, 0.0, 1.0), 3.2) * 0.22;

        // Interactive cursor liquid glow aura
        float aura = smoothstep(0.48, 0.0, mouseDist);
        col += mix(colorCyan, colorHighlight, 0.45) * aura * (0.28 + speed * 0.8);
        
        // High-frequency caustic / liquid shimmer
        float caustic = pow(clamp(organicFluid * 1.35 + valG, 0.0, 1.0), 3.5);
        col += colorHighlight * caustic * 0.24;

        // Subtle edge vignette
        vec2 vig = uv * (1.0 - uv.yx);
        float vigFactor = clamp(pow(vig.x * vig.y * 15.0, 0.28), 0.0, 1.0);
        col = mix(col * 0.7, col, vigFactor);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Shader compile failed:', glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering screen
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    );

    const aPosLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uPrevMouseLoc = gl.getUniformLocation(program, 'u_prev_mouse');
    const uVelLoc = gl.getUniformLocation(program, 'u_velocity');
    const uRipplesLoc = gl.getUniformLocation(program, 'u_ripples');

    // State
    let width = 0;
    let height = 0;
    let startTime = performance.now();
    let mouse = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };
    let prevMouse = { x: 0.5, y: 0.5 };
    let velocity = { x: 0.0, y: 0.0 };
    let ripples: { x: number; y: number; time: number; strength: number }[] = [];

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const displayWidth = Math.floor(window.innerWidth * dpr);
      const displayHeight = Math.floor(window.innerHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        width = displayWidth;
        height = displayHeight;
        gl.viewport(0, 0, width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      targetMouse.x = clientX / window.innerWidth;
      // Invert Y to match GL FragCoord
      targetMouse.y = 1.0 - clientY / window.innerHeight;
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const rx = clientX / window.innerWidth;
      const ry = 1.0 - clientY / window.innerHeight;
      const nowSec = (performance.now() - startTime) / 1000;

      // Add ripple (keep maximum 5 active ripples)
      ripples.push({ x: rx, y: ry, time: nowSec, strength: 1.0 });
      if (ripples.length > 5) {
        ripples.shift();
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mousedown', handlePointerDown, { passive: true });
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    let animationFrameId: number;

    const render = () => {
      const now = performance.now();
      const elapsedSec = (now - startTime) / 1000;

      // Smooth lerp mouse coordinates
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
      mouse.x += (targetMouse.x - mouse.x) * 0.16;
      mouse.y += (targetMouse.y - mouse.y) * 0.16;

      // Compute decaying velocity with higher kinetic response
      const vx = (mouse.x - prevMouse.x) * 2.2;
      const vy = (mouse.y - prevMouse.y) * 2.2;
      velocity.x += (vx - velocity.x) * 0.22;
      try {
        gl.useProgram(program);

      gl.uniform2f(uResLoc, width, height);
      gl.uniform1f(uTimeLoc, elapsedSec);
      gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
      gl.uniform2f(uPrevMouseLoc, prevMouse.x, prevMouse.y);
      gl.uniform2f(uVelLoc, velocity.x, velocity.y);

      // Pack ripples into float array [x, y, start_time, strength]
      const rippleData = new Float32Array(20);
      for (let i = 0; i < 5; i++) {
        if (i < ripples.length) {
          rippleData[i * 4 + 0] = ripples[i].x;
          rippleData[i * 4 + 1] = ripples[i].y;
          rippleData[i * 4 + 2] = ripples[i].time;
          rippleData[i * 4 + 3] = ripples[i].strength;
        } else {
          rippleData[i * 4 + 3] = 0.0;
        }
      }
      gl.uniform4fv(uRipplesLoc, rippleData);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } catch (err) {
        console.warn('WebGL render cycle error:', err);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    try {
      render();
    } catch (e) {
      console.warn('Could not start WebGL render loop:', e);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
      try {
        if (positionBuffer && gl) gl.deleteBuffer(positionBuffer);
        if (program && gl) gl.deleteProgram(program);
        if (vertexShader && gl) gl.deleteShader(vertexShader);
        if (fragmentShader && gl) gl.deleteShader(fragmentShader);
      } catch {
        // Safe context disposal
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#07080d] ${className}`}>
      {/* Background ambient color glow fallback in case WebGL is unavailable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.22),rgba(7,8,13,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_70%,rgba(34,211,238,0.18),rgba(7,8,13,0))]" />

      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 sm:opacity-80"
      />
      {/* Contrast scrim and vignette to ensure all text is sharply readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(7, 8, 13, 0.2) 0%, rgba(7, 8, 13, 0.5) 60%, rgba(7, 8, 13, 0.85) 100%)',
        }}
      />
    </div>
  );
};
