"use client";

import { useEffect, useRef } from "react";

export default function ThreeParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;
    let points: any = null;
    let animationFrameId: number;
    let logoText = "Sephoraspa";

    const initThree = () => {
      const THREE = (window as any).THREE;
      if (!THREE || !containerRef.current) return;

      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Scene & Camera
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.z = 280;

      // Draw text to an offscreen canvas to extract pixel coordinates
      const textCanvas = document.createElement("canvas");
      const textCtx = textCanvas.getContext("2d");
      textCanvas.width = 480;
      textCanvas.height = 120;

      if (!textCtx) return;
      textCtx.fillStyle = "#ffffff";
      textCtx.font = "bold 56px 'Playfair Display', Georgia, serif";
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      textCtx.fillText(logoText.toUpperCase(), textCanvas.width / 2, textCanvas.height / 2);

      const imgData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);
      const data = imgData.data;

      const tempPoints: { tx: number; ty: number; tz: number }[] = [];
      const step = 2; // Particle density step

      for (let y = 0; y < textCanvas.height; y += step) {
        for (let x = 0; x < textCanvas.width; x += step) {
          const index = (y * textCanvas.width + x) * 4;
          const alpha = data[index + 3];

          // If the pixel is filled, generate a particle coordinate
          if (alpha > 128) {
            tempPoints.push({
              tx: (x - textCanvas.width / 2) * 1.1,      // Target X
              ty: (textCanvas.height / 2 - y) * 1.1,      // Target Y
              tz: (Math.random() - 0.5) * 15,             // Target Z
            });
          }
        }
      }

      // Build Three.js buffer geometry
      const particleCount = tempPoints.length;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const originalPositions = new Float32Array(particleCount * 3);
      const randomOffsets = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const pt = tempPoints[i];
        
        // Initial / Target positions
        positions[i * 3] = pt.tx;
        positions[i * 3 + 1] = pt.ty;
        positions[i * 3 + 2] = pt.tz;

        originalPositions[i * 3] = pt.tx;
        originalPositions[i * 3 + 1] = pt.ty;
        originalPositions[i * 3 + 2] = pt.tz;

        // Dispersion noise vectors
        randomOffsets[i * 3] = (Math.random() - 0.5) * 350;     // X scatter
        randomOffsets[i * 3 + 1] = (Math.random() - 0.5) * 350; // Y scatter
        randomOffsets[i * 3 + 2] = (Math.random() - 0.5) * 200; // Z scatter
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      // Glow Particle Texture
      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = 16;
      glowCanvas.height = 16;
      const glowCtx = glowCanvas.getContext("2d");
      if (glowCtx) {
        const gradient = glowCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(212, 175, 87, 0.9)"); // Gold glow
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        glowCtx.fillStyle = gradient;
        glowCtx.fillRect(0, 0, 16, 16);
      }

      const texture = new THREE.CanvasTexture(glowCanvas);
      const material = new THREE.PointsMaterial({
        size: 5,
        map: texture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0.8,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      // WebGL Renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // Interactivity tracking
      let mouseX = 0;
      let mouseY = 0;
      let currentScroll = 0;

      const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
      };

      const handleScroll = () => {
        currentScroll = window.scrollY;
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("scroll", handleScroll);

      // Resize handler
      const handleResize = () => {
        if (!containerRef.current || !renderer || !camera) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      // Animation Loop
      let clock = 0;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        clock += 0.015;

        // Calculate dispersion ratio based on scroll position (max dispersal at 650px scroll)
        const scrollMax = 650;
        const rawRatio = Math.min(currentScroll / scrollMax, 1);
        
        // Add a smooth easing to the dispersion ratio
        const dispersionRatio = Math.pow(rawRatio, 1.5); 

        const positionAttr = geometry.attributes.position;
        const arr = positionAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idxX = i * 3;
          const idxY = i * 3 + 1;
          const idxZ = i * 3 + 2;

          // Original target position
          const ox = originalPositions[idxX];
          const oy = originalPositions[idxY];
          const oz = originalPositions[idxZ];

          // Noise dispersion target
          const nx = ox + randomOffsets[idxX] + Math.sin(clock + i * 0.1) * 35;
          const ny = oy + randomOffsets[idxY] + Math.cos(clock + i * 0.1) * 35;
          const nz = oz + randomOffsets[idxZ];

          // Interpolate positions based on scroll dispersion
          arr[idxX] = ox + (nx - ox) * dispersionRatio;
          arr[idxY] = oy + (ny - oy) * dispersionRatio;
          arr[idxZ] = oz + (nz - oz) * dispersionRatio;
        }

        positionAttr.needsUpdate = true;

        // Smooth camera tilt on mouse moves
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY + 40 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        if (container && renderer && renderer.domElement) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    initThree();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80" />;
}
