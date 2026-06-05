import { useNavigate } from "react-router-dom";
import bgImage from "../../../assets/homebanner-blood-hero.png";


const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[340px] sm:h-[420px] lg:h-[650px] flex items-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 ml-6 max-w-xl rounded-2xl bg-white/85 p-6 shadow-xl backdrop-blur-sm sm:ml-12 sm:p-8">
        <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.2em] text-red-600">
          Save Lives Today
        </p>
        <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Donate Blood, Give Someone Another Tomorrow
        </h1>
        <h2 className="mt-3 text-lg font-bold text-red-600 sm:text-xl">
          Fast access to donors when every minute matters
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
          RedStream connects patients, donors, and healthcare teams to make
          blood support simple, quick, and reliable.
        </p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-red-700 hover:scale-105"
        >
          Login Here
        </button>
      </div>
    </section>
  );
};

export default CallToAction;