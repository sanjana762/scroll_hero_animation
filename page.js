"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { value: "85%", label: "Scroll engagement improvement" },
  { value: "63%", label: "Smoother visual retention" },
  { value: "42%", label: "Better premium UI perception" }
];

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const carRef = useRef(null);
  const roadLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleRef.current.querySelectorAll(".hero-letter");

      gsap.fromTo(
        letters,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.05
        }
      );

      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.5
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let currentRotate = 0;
    let currentScale = 1;

    let targetX = 0;
    let targetY = 0;
    let targetRotate = 0;
    let targetScale = 1;

    let ticking = false;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateAnimation = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      currentRotate = lerp(currentRotate, targetRotate, 0.08);
      currentScale = lerp(currentScale, targetScale, 0.08);

      if (carRef.current) {
        carRef.current.style.transform = `
          translate3d(${currentX}px, ${currentY}px, 0)
          rotate(${currentRotate}deg)
          scale(${currentScale})
        `;
      }

      if (roadLineRef.current) {
        roadLineRef.current.style.transform = `translateX(${-currentX * 0.2}px)`;
      }

      const stillMoving =
        Math.abs(currentX - targetX) > 0.1 ||
        Math.abs(currentY - targetY) > 0.1 ||
        Math.abs(currentRotate - targetRotate) > 0.1 ||
        Math.abs(currentScale - targetScale) > 0.001;

      if (stillMoving) {
        requestAnimationFrame(updateAnimation);
      } else {
        ticking = false;
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 1.5;
      const progress = Math.min(scrollY / heroHeight, 1);

      targetX = progress * 420;
      targetY = progress * 120;
      targetRotate = progress * -8;
      targetScale = 1 - progress * 0.12;

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateAnimation);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headline = "WELCOME ITZ FIZZ".split("");

  return (
    <main className="bg-[#050816] text-white overflow-x-hidden">
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 md:px-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.18),transparent_28%)]" />

        <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div className="overflow-hidden">
              <h1
                ref={titleRef}
                className="text-3xl md:text-5xl xl:text-6xl font-semibold uppercase leading-[1.4] tracking-[0.45em] md:tracking-[0.55em]"
              >
                {headline.map((char, index) => (
                  <span
                    key={index}
                    className="hero-letter inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
            </div>

            <p className="max-w-xl text-white/70 text-sm md:text-base leading-7">
              A premium scroll-driven hero section built with smooth intro motion,
              staggered metrics, and fluid scroll-based transforms using GSAP and
              performant browser animation techniques.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {stats.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (statsRef.current[index] = el)}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-glow"
                >
                  <h3 className="text-2xl md:text-3xl font-bold">{item.value}</h3>
                  <p className="mt-2 text-sm text-white/65 leading-6">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[420px] md:h-[520px] flex items-center justify-center">
            <div className="absolute inset-x-0 bottom-20 h-[2px] bg-white/10 overflow-hidden rounded-full">
              <div
                ref={roadLineRef}
                className="h-full w-[180%] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.9)_10%,transparent_20%,transparent_30%,rgba(255,255,255,0.9)_40%,transparent_50%,transparent_60%,rgba(255,255,255,0.9)_70%,transparent_80%,transparent_100%)]"
              />
            </div>

            <div
              ref={carRef}
              className="relative will-change-transform"
              style={{ transform: "translate3d(0px, 0px, 0) rotate(0deg) scale(1)" }}
            >
              <img
                src="/car2.png"
                alt="Main visual"
                className="w-[700px] md:w-[1100px]mt-10 md:mt-16 drop-shadow-[0_25px_60px_rgba(0,0,0,0.45)] select-none pointer-events-none"
              />
            </div>

            <div className="absolute -z-10 w-[320px] h-[320px] rounded-full bg-pink-500/20 blur-[100px]" />
            <div className="absolute -z-10 right-10 top-10 w-[240px] h-[240px] rounded-full bg-indigo-500/20 blur-[100px]" />
          </div>
        </div>
      </section>

      <section className="min-h-[140vh] px-6 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Scroll Interaction
              </h2>
              <p className="text-white/70 leading-7">
                As you scroll down, the main object moves horizontally and slightly
                vertically, while rotating and scaling subtly. This motion is tied
                directly to scroll progress and softened using interpolation for a
                premium feel.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Performance First
              </h2>
              <p className="text-white/70 leading-7">
                The animation uses transform-based updates and requestAnimationFrame
                to avoid layout thrashing. This keeps the interaction smooth and
                visually stable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}