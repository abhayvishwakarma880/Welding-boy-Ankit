"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
import gsap from "gsap";

const SLIDES = [
  "/images/sliders/hero-welding-services-khadda.webp",
  "/images/sliders/hero-steel-gate-fabrication.webp",
  "/images/sliders/hero-grill-railing-welding.webp",
];

export default function HeroSlider() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const getSize = () => ({ width: el.clientWidth, height: el.clientHeight });
    const { width, height } = getSize();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const uniforms = {
      texture1: { value: null as THREE.Texture | null },
      texture2: { value: null as THREE.Texture | null },
      progress: { value: 0 },
      screenSize: { value: new THREE.Vector2(width, height) },
    };

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
          vec2 uv = coverUv(vUv, screenSize, vec2(1920.0, 1080.0));
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(uv, center);
          float rippleStrength = sin(progress * 3.141592);
          float ripple = sin(35.0 * dist - progress * 20.0) * 0.015 * rippleStrength;
          vec2 rippleUv = uv + normalize(uv - center) * ripple;
          vec4 t1 = texture2D(texture1, rippleUv);
          vec4 t2 = texture2D(texture2, uv);
          gl_FragColor = mix(t1, t2, progress);
        }
      `,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const rafId = { current: 0 };
    const animate = () => {
      rafId.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const loader = new THREE.TextureLoader();
    let currentIndex = 0;
    let textures: THREE.Texture[] = [];

    const startSlider = (loadedTextures: THREE.Texture[]) => {
      textures = loadedTextures;
      uniforms.texture1.value = textures[0];
      uniforms.texture2.value = textures[1];

      const nextSlide = () => {
        if (cancelled) return;
        const nextIndex = (currentIndex + 1) % textures.length;
        uniforms.texture1.value = textures[currentIndex];
        uniforms.texture2.value = textures[nextIndex];
        uniforms.progress.value = 0;

        gsap.to(uniforms.progress, {
          value: 1,
          duration: 2,
          ease: "power2.inOut",
          onComplete: () => {
            currentIndex = nextIndex;
            uniforms.texture1.value = textures[currentIndex];
            uniforms.progress.value = 0;
          },
        });
      };

      const schedule = () => {
        timeout = setTimeout(() => {
          nextSlide();
          schedule();
        }, 3500);
      };

      timeout = setTimeout(() => {
        nextSlide();
        schedule();
      }, 2500);
    };

    Promise.all(SLIDES.map((src) => loader.loadAsync(src))).then((loaded) => {
      if (!cancelled) startSlider(loaded);
      else loaded.forEach((t) => t.dispose());
    });

    const handleResize = () => {
      if (!el) return;
      const { width, height } = getSize();
      renderer.setSize(width, height);
      uniforms.screenSize.value.set(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", handleResize);
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative w-full h-[200px] md:h-screen overflow-hidden">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      <div className="sr-only" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <Image key={src} src={src} alt="" width={1920} height={1080} priority={i === 0} />
        ))}
      </div>
    </section>
  );
}
