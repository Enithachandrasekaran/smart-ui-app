import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import CallToAction from "./components/CallToAction";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/footer"; // ✅ Capital F
import Hero from "./sections/Hero"
import Features from "./components/Card";
import BloodBanner from "./sections/Banner";
import HomeBanner from "./sections/homebanner";
import Header from "./sections/header";

const sectionAnimations = [
  { autoAlpha: 0, y: 80, scale: 0.98 },
  { autoAlpha: 0, x: -90 },
  { autoAlpha: 0, y: 70, rotateX: -8 },
  { autoAlpha: 0, x: 90 },
  { autoAlpha: 0, scale: 0.92 },
  { autoAlpha: 0, y: 90, rotate: 1.5 },
  { autoAlpha: 0, y: 45 },
];

const visibleState = {
  autoAlpha: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  rotateX: 0,
};


function LandingPage() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const sections = sectionsRef.current.filter(Boolean);

    sections.forEach((section, index) => {
      gsap.set(section, {
        transformOrigin: "center center",
        ...sectionAnimations[index],
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.animationIndex || 0);

          gsap.to(entry.target, {
            ...visibleState,
            duration: 0.85 + index * 0.04,
            ease: index % 2 === 0 ? "power3.out" : "back.out(1.15)",
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white">
      <Header />
      <div data-animation-index="0" ref={(el) => (sectionsRef.current[0] = el)}>
        <HomeBanner />
      </div>
      <div data-animation-index="1" ref={(el) => (sectionsRef.current[1] = el)}>
        <BloodBanner />
      </div>
      <div data-animation-index="2" ref={(el) => (sectionsRef.current[2] = el)}>
        <Features />
      </div>
      <div data-animation-index="3" ref={(el) => (sectionsRef.current[3] = el)}>
        <Hero />
      </div>
      <div data-animation-index="4" ref={(el) => (sectionsRef.current[4] = el)}>
        <Testimonials />
      </div>
      <div data-animation-index="5" ref={(el) => (sectionsRef.current[5] = el)}>
        <CallToAction />
      </div>
      <div data-animation-index="6" ref={(el) => (sectionsRef.current[6] = el)}>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;