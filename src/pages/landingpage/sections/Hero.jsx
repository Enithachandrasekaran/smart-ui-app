import { FaArrowRight } from "react-icons/fa";
import Logo from "../../../assets/heroimage.svg"; // adjust path
import { Button, Button2 } from "../components/Button"; // ✅ FIXED PATH
import { useNavigate } from "react-router-dom";

const BloodHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-gray-50">

      {/* 🔴 RIGHT RED BACKGROUND */}
      <div className="absolute right-0 top-0 w-[40%] h-full bg-red-600"></div>

      {/* MAIN CONTAINER (CENTERED) */}
      <div className="relative z-20 max-w-7xl mx-auto px-10 w-full grid md:grid-cols-2 items-center">

        {/* 🧾 LEFT CONTENT */}
        <div className="space-y-6 pr-10">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Are You in Need of Blood or Platelets?
          </h1>

          <h3 className="text-xl font-semibold text-gray-800">
            Quickly Find Voluntary Blood / Blood Component Donors!
          </h3>

          <p className="text-gray-600 leading-relaxed">
            38,000 blood donations and hundreds of platelet donations are needed every day.
            Blood cannot be manufactured, so finding donors quickly is critical.
          </p>

          <p className="text-gray-700 font-medium">
            TALBlood Aid bridges the gap between you and donors.
          </p>

          {/* BUTTONS */}
          {/* Buttons INSIDE CTA */}
          <div className="mt-6  flex gap-4">
            <Button label="Click Here" />
            <Button2 label="Login" onClick={() => navigate("/login")} />
          </div>
        </div>

        {/* ⚪ RIGHT SIDE (CENTERED CIRCLE) */}
        <div className="relative flex ">

          <div className="w-[430px] h-[430px] bg-white rounded-full shadow-2xl flex items-center justify-center">

            <img
              src={Logo}
              alt="blood"
              className="w-100"
            />

          </div>

        </div>

      </div>
    </section>
  );
};

export default BloodHero;