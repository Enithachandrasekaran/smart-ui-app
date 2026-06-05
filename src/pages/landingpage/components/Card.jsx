import React from "react";
import { FaTint, FaUserFriends, FaHeartbeat, FaHandHoldingHeart } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const features = [
  {
    icon: <FaTint />,
    title: "Donate Blood",
    desc: "Become a life saver by donating blood and helping patients in urgent need.",
  },
  {
    icon: <FaUserFriends />,
    title: "Find Donors",
    desc: "Quickly connect with voluntary donors available near your location.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Emergency Support",
    desc: "Get immediate assistance for critical situations and urgent blood needs.",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Save Lives",
    desc: "Every drop counts. Your contribution can make a real difference.",
  },
];

const Features = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className="py-20 bg-[#eaf5ff]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="">

      <div className="max-w-3xl">

        {/* First Line */}
        <p className="text-xl md:text-2xl font-semibold text-gray-800 tracking-wide">
          TAL{" "}
          <span className="text-red-600 font-bold">
            RedStream:
          </span>
        </p>

        {/* Second Line */}
        <p className="mt-4 text-2xl md:text-4xl font-bold text-gray-900 leading-snug">
          A Smart Platform to Make a{" "}
          <span className="text-red-600 relative">
            Lifesaving Difference

            {/* underline effect */}
            <span className="absolute left-0 bottom-0 w-full h-1 bg-red-200 -z-10"></span>
          </span>
        </p>

      </div>

    </div>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl mb-4 group-hover:scale-110 transition">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;