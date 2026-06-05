import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import homeImage from "../../../assets/herobanner.png";
import { Button, Button2 } from "../components/Button";
import { useNavigate } from "react-router-dom";

const BloodSlider = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-gray-50 py-16 px-6 md:px-16">
      
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >

        {/* ✅ SLIDE 1 */}
        <SwiperSlide>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* LEFT CONTENT */}
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Join Us in Making India <br /> Blood Sufficient
              </h1>

              <div className="w-12 h-1 bg-red-500 my-4"></div>

              <p className="text-gray-600 text-lg mb-6">
                Timely access to blood and blood components can save countless lives,
                avoiding preventable deaths.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm mb-8">
                <p>India needs 15 million units of blood each year.</p>
                <p>Only 10 million units of blood are available.</p>
                <p>Every day 12,000 patients in India die due to inaccessibility to timely blood transfusion.</p>
                <p>India falls short of 2.5 donations for every 1000 eligible donors.</p>
              </div>

              <div className="flex gap-4">
                

             
              <Button label="Click Here" />
            <Button2 label="Login" onClick={() => navigate("/login")} />


         
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={homeImage}
                alt="India Blood Map"
                className="w-full max-w-md"
              />
            </div>

          </div>
        </SwiperSlide>

        {/* ✅ SLIDE 2 (REVERSED ONLY) */}
        <SwiperSlide>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-10">
            
            {/* SAME CONTENT */}
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Join Us in Making India <br /> Blood Sufficient
              </h1>

              <div className="w-12 h-1 bg-red-500 my-4"></div>

              <p className="text-gray-600 text-lg mb-6">
                Timely access to blood and blood components can save countless lives,
                avoiding preventable deaths.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm mb-8">
                <p>India needs 15 million units of blood each year.</p>
                <p>Only 10 million units of blood are available.</p>
                <p>Every day 12,000 patients in India die due to inaccessibility to timely blood transfusion.</p>
                <p>India falls short of 2.5 donations for every 1000 eligible donors.</p>
              </div>

              <div className="flex gap-4">
             
              <Button2 label="Login" onClick={() => navigate("/login")} />
              <Button label="Click Here" />
              </div>
            </div>

            {/* SAME IMAGE */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={homeImage}
                alt="India Blood Map"
                className="w-full max-w-md"
              />
            </div>

          </div>
        </SwiperSlide>

      </Swiper>

      {/* ✅ YOUR EXACT DOT STYLE */}
      <div className="flex gap-2 justify-center mt-6">
        {[0, 1].map((index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to testimonial ${index + 1}`}
            onClick={() => swiperRef.current.slideToLoop(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 bg-red-500"
                : "w-2 bg-red/40 hover:bg-red/60"
            }`}
          ></button>
        ))}
      </div>

    </section>
  );
};

export default BloodSlider;