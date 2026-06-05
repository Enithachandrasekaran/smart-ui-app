import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaHeartbeat, FaQuoteLeft } from "react-icons/fa";

/** Testimonials section background */
const TESTIMONIALS_BG =
  "linear-gradient(135deg, #fff7f7 0%, #ffffff 45%, #fee2e2 100%)";

const data = [
  {
    name: "Rahul Kumar",
    role: "Regular Donor",
    image: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a",
    quote:
      "Donating blood here was a life-changing experience. The staff ensured complete safety and hygiene. The process was smooth and professional. I felt proud to contribute and help save lives. Highly recommended for everyone.",
  },
  {
    name: "Priya Sharma",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1628749528992-f5702133b686",
    quote:
      "During an emergency, this blood bank helped us instantly. The team was supportive and handled everything professionally. Their quick response made a huge difference. Truly grateful for their service.",
  },
  {
    name: "Rahul Kumar",
    role: "Regular Donor",
    image: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a",
    quote:
      "Donating blood here was a life-changing experience. The staff ensured complete safety and hygiene. The process was smooth and professional. I felt proud to contribute and help save lives. Highly recommended for everyone.",
  },
  {
    name: "Priya Sharma",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1628749528992-f5702133b686",
    quote:
      "During an emergency, this blood bank helped us instantly. The team was supportive and handled everything professionally. Their quick response made a huge difference. Truly grateful for their service.",
  },
  
];

function getLayout(index, active, total) {
  let d = index - active;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;

  const w = typeof window !== "undefined" ? window.innerWidth : 1024;
  const spread = w < 640 ? 110 : w < 1024 ? 220 : 300;
  const far = w < 640 ? 180 : 400;

  if (d === 0) {
    return {
      rotationY: 0,
      x: 0,
      z: 120,
      scale: 1,
      opacity: 1,
      zIndex: 30,
    };
  }
  if (d === 1) {
    return {
      rotationY: -48,
      x: spread,
      z: -72,
      scale: 0.88,
      opacity: 0.82,
      zIndex: 10,
    };
  }
  if (d === -1) {
    return {
      rotationY: 48,
      x: -spread,
      z: -72,
      scale: 0.88,
      opacity: 0.82,
      zIndex: 10,
    };
  }
  return {
    rotationY: d > 0 ? -68 : 68,
    x: d > 0 ? far : -far,
    z: -160,
    scale: 0.72,
    opacity: 0,
    zIndex: 0,
  };
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const cardsRef = useRef([]);
  const didMount = useRef(false);
  const bgLayerRef = useRef(null);
  const blobRefs = useRef([]);
  const pulseRef = useRef(null);

  useEffect(() => {
    const blobs = blobRefs.current.filter(Boolean);
    const ctx = gsap.context(() => {
      blobs.forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 === 0 ? 45 : -35,
          y: i === 1 ? 40 : -30,
          scale: 1.08,
          duration: 7 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });
      if (pulseRef.current) {
        gsap.to(pulseRef.current, {
          scale: 1.06,
          opacity: 0.35,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (bgLayerRef.current) {
        gsap.to(bgLayerRef.current, {
          backgroundPosition: "100% 50%",
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const duration = didMount.current ? 0.85 : 0;
    didMount.current = true;

    cards.forEach((card, index) => {
      const p = getLayout(index, active, data.length);
      gsap.set(card, { zIndex: p.zIndex });
      gsap.to(card, {
        rotationY: p.rotationY,
        x: p.x,
        z: p.z,
        scale: p.scale,
        opacity: p.opacity,
        duration,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });
  }, [active]);

  useLayoutEffect(() => {
    const onResize = () => {
      const cards = cardsRef.current.filter(Boolean);
      cards.forEach((card, index) => {
        const p = getLayout(index, active, data.length);
        gsap.set(card, {
          rotationY: p.rotationY,
          x: p.x,
          z: p.z,
          scale: p.scale,
          opacity: p.opacity,
          zIndex: p.zIndex,
        });
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  const next = () => setActive((prev) => (prev + 1) % data.length);
  const prev = () =>
    setActive((prev) => (prev === 0 ? data.length - 1 : prev - 1));

  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden text-gray-900"
      style={{ background: TESTIMONIALS_BG }}
    >
      {/* Slow-moving light wash on top of primary */}
      <div
        ref={bgLayerRef}
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background:
            "linear-gradient(120deg, rgba(220,38,38,0.12) 0%, rgba(255,255,255,0) 40%, rgba(220,38,38,0.1) 100%)",
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 50%",
        }}
      />

      {/* Floating soft blobs (GSAP) — white haze on primary */}
      <div
        ref={(el) => {
          blobRefs.current[0] = el;
        }}
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-red-200/60 blur-3xl"
      />
      <div
        ref={(el) => {
          blobRefs.current[1] = el;
        }}
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 -translate-y-1/2 rounded-full bg-red-300/35 blur-3xl"
      />
      <div
        ref={(el) => {
          blobRefs.current[2] = el;
        }}
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-rose-200/45 blur-2xl"
      />

      {/* Center pulse ring */}
      <div
        ref={pulseRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-200 bg-red-100/20"
      />

      <style>{`
        @keyframes testimonials-ekg {
          0% { stroke-dashoffset: 900; opacity: 0.25; }
          45% { opacity: 0.7; }
          100% { stroke-dashoffset: 0; opacity: 0.25; }
        }
        .testimonials-ekg-path {
          stroke-dasharray: 200 700;
          animation: testimonials-ekg 3.2s ease-in-out infinite;
        }
      `}</style>

      <svg
        className="pointer-events-none absolute bottom-6 left-0 right-0 mx-auto w-[min(96%,720px)] text-red-300/70"
        viewBox="0 0 800 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          className="testimonials-ekg-path"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M0 40 H180 L200 40 L220 10 L240 70 L260 20 L280 40 H800"
        />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 font-semibold text-sm tracking-wide uppercase mb-3 text-red-600">
            <FaHeartbeat className="text-red-600" />
            <span>Real Stories</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Voices from our community
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Use the arrows to browse — each story sits in 3D space.
          </p>
        </div>

        <div className="relative mx-auto h-[min(72vh,560px)] max-w-5xl [perspective:1200px] [perspective-origin:50%_45%]">
          <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">
            {data.map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="absolute left-1/2 top-1/2 w-[min(92vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/90 bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] backdrop-blur-sm [transform-style:preserve-3d] [backface-visibility:hidden] will-change-transform"
                style={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 overflow-hidden rounded-2xl">
                  <div className="sm:col-span-2 relative aspect-[4/5] sm:aspect-auto sm:min-h-[280px]">
                    <img
                      src={item.image}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-white" />
                  </div>
                  <div className="sm:col-span-3 p-6 sm:p-8 flex flex-col justify-center gap-3 bg-white">
                    <FaQuoteLeft
                      className="text-xl shrink-0"
                      style={{ color: "var(--primary-color)" }}
                    />
                    <p className="text-gray-700 text-sm sm:text-[15px] leading-relaxed line-clamp-6 sm:line-clamp-none">
                      {item.quote}
                    </p>
                    <div className="pt-2 border-t border-gray-200 mt-1">
                      <p className="font-semibold text-gray-900 text-lg">
                        {item.name}
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--primary-color)" }}
                      >
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-100 bg-white text-gray-900 shadow-md transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-red-50"
              style={{ color: "var(--primary-color)" }}
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-100 bg-white text-gray-900 shadow-md transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-red-50"
              style={{ color: "var(--primary-color)" }}
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
          <div className="flex gap-2">
            {data.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-red-600"
                    : "w-2 bg-red-200 hover:bg-red-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
