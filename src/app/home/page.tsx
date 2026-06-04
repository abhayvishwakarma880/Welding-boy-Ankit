"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const images = [
  "/images/sliders/01.png",
  "/images/sliders/02.png",
  "/images/sliders/03.png",
];

export default function HeroSlider() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef<{
    texture1: { value: THREE.Texture };
    texture2: { value: THREE.Texture };
    progress: { value: number };
    screenSize: { value: THREE.Vector2 };
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let currentIndex = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;

    const getSize = () => ({
      width: mountRef.current!.clientWidth,
      height: mountRef.current!.clientHeight,
    });

    const { width, height } = getSize();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const textures = images.map((img) => loader.load(img));

    const uniforms = {
      texture1: { value: textures[0] },
      texture2: { value: textures[1] },
      progress: { value: 0 },
      screenSize: { value: new THREE.Vector2(width, height) },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
          varying vec2 vUv;

          uniform sampler2D texture1;
          uniform sampler2D texture2;
          uniform float progress;
          uniform vec2 screenSize;

          vec2 coverUv(vec2 uv, vec2 screenSz, vec2 imageSize) {
            float screenRatio = screenSz.x / screenSz.y;
            float imageRatio = imageSize.x / imageSize.y;
            vec2 newUv = uv;
            if (screenRatio > imageRatio) {
              float scale = imageRatio / screenRatio;
              newUv.y = uv.y * scale + (1.0 - scale) * 0.5;
            } else {
              float scale = screenRatio / imageRatio;
              newUv.x = uv.x * scale + (1.0 - scale) * 0.5;
            }
            return newUv;
          }

          void main() {

              vec2 image = vec2(1920.0, 1080.0);

              vec2 uv = coverUv(vUv, screenSize, image);

              vec2 center = vec2(0.5, 0.5);

              float dist = distance(uv, center);

              float rippleStrength = sin(progress * 3.141592);

          float ripple = sin(35.0 * dist - progress * 20.0)
                        * 0.015
                        * rippleStrength;

          vec2 rippleUv = uv + normalize(uv - center) * ripple;
 
          vec4 t1 = texture2D(texture1, rippleUv);
          vec4 t2 = texture2D(texture2, uv);

          gl_FragColor = mix(t1, t2, progress);
          }
          `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const nextSlide = () => {
      const nextIndex = (currentIndex + 1) % textures.length;

      uniforms.texture1.value = textures[currentIndex];
      uniforms.texture2.value = textures[nextIndex];

      uniforms.progress.value = 0;

      gsap.to(uniforms.progress, {
        value: 1,
        duration: 2,
        ease: "power2.inOut",

        onComplete: () => {
          // IMPORTANT
          currentIndex = nextIndex;

          // lock final image properly
          uniforms.texture1.value = textures[currentIndex];

          uniforms.progress.value = 0;
        },
      });
    };

    // const interval = setInterval(nextSlide, 5000);

    const startSlider = () => {
      nextSlide();

      setTimeout(startSlider, 3500);
    };

    const timeout = setTimeout(startSlider, 2500);

    const handleResize = () => {
      if (!mountRef.current) return;
      const { width, height } = getSize();
      renderer.setSize(width, height);
      uniforms.screenSize.value.set(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative w-full h-[200px] md:h-screen overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}
    </section>
  );
}
