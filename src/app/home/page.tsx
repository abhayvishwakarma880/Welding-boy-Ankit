// "use client";

// import { useEffect, useRef } from "react";

// export default function HeroSection() {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play().catch(() => {});
//     }
//   }, []);

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

//       {/* Background Video */}
//       <video
//         ref={videoRef}
//         className="absolute inset-0 w-full h-full object-cover"
//         src="/video/video.mp4"
//         autoPlay
//         muted
//         loop
//         playsInline
//       />

//       {/* Dark + Orange Gradient Overlay */}
//       <div className="absolute inset-0 bg-linear-to-br from-black/85 via-black/70 to-orange-950/60" />

//       {/* Decorative orange corner accent */}
//       <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
//       <div className="absolute top-0 left-0 w-64 h-1 bg-orange-500" />

//       {/* Bottom fade */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent" />

//       {/* Content */}
//       <div className="relative z-10 max-w-5xl -ml-40 px-6 py-12 text-white">

//         {/* Badge */}
//         {/* <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-orange-500/40 bg-orange-500/10 rounded-full">
//           <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
//           <span className="text-orange-300 text-sm font-medium tracking-widest uppercase">
//             Lucknow's Trusted Metal Fabricators
//           </span>
//         </div> */}

//         {/* Heading */}
//         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
//           Expert Welding &{" "}
//           <span className="text-orange-500">Steel Fabrication</span>{" "}
//           Services in Khadda
//         </h1>

//         {/* Description */}
//         <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
//           Custom gates, railings, sheds, grills, and metal fabrication solutions
//           crafted with{" "}
//           <span className="text-orange-400 font-semibold">
//             strength, precision, and modern design
//           </span>
//           . Trusted by residential and commercial clients across Lucknow.
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex flex-wrap gap-4 items-center">

//           {/* Primary CTA */}
//           <a
//             href="#contact"
//             className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-bold text-base px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide shadow-lg shadow-orange-500/30 hover:shadow-orange-400/40 hover:-translate-y-0.5"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//             </svg>
//             Get Free Quote
//           </a>

//           {/* Secondary CTA — Call Now */}
//           <a
//             href="tel:+919999999999"
//             className="group inline-flex items-center gap-2 border-2 border-white/70 hover:border-orange-400 text-white hover:text-orange-400 font-bold text-base px-8 py-4 rounded-none transition-all duration-200 uppercase tracking-wide hover:-translate-y-0.5"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M2 6.5A2.5 2.5 0 014.5 4h1.372a1 1 0 01.958.713l1.096 3.653a1 1 0 01-.29 1.027L6.25 10.5c1.178 2.36 3.04 4.25 5.5 5.5l1.107-1.386a1 1 0 011.027-.29l3.653 1.096A1 1 0 0118.5 16.5v1a2.5 2.5 0 01-2.5 2.5C7.611 20 2 12.389 2 6.5z" />
//             </svg>
//             Call Now
//           </a>

//         </div>

//         {/* Trust stats */}
//         <div className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-white/10">
//           {[
//             { value: "500+", label: "Projects Completed" },
//             { value: "10+", label: "Years Experience" },
//             { value: "100%", label: "Client Satisfaction" },
//           ].map((stat) => (
//             <div key={stat.label}>
//               <div className="text-3xl font-black text-orange-500">{stat.value}</div>
//               <div className="text-sm text-gray-400 mt-0.5 uppercase tracking-wide">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

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
