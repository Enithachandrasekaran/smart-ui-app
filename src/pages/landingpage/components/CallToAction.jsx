import bgImage from "../../../assets/cta-blood-background.png";
import { Button, Button2 } from "./Button"; // ✅ FIXED PATH
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[500px] flex items-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Gradient */}
     

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-xl ml-6">

          <h2 className="text-4xl text-center font-extrabold text-gray-900 leading-tight">
            Industrial Calibration Services
          </h2>

          <p className="text-red-600 text-center font-bold mt-3 text-xl">
            Precision | Compliance | Reliability
          </p>

          {/* Buttons INSIDE CTA */}
          <div className="mt-6 justify-center flex gap-4">
            <Button label="Login" onClick={() => navigate("/login")} />
            <Button2 label="Register" onClick={() => navigate("/registration")} />
          </div>

          <p className="mt-6 text-center text-gray-600 leading-relaxed text-[15px]">
            Ensure precision, safety, and compliance with certified calibration
            services. Schedule your calibration today and stay audit-ready.
          </p>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;