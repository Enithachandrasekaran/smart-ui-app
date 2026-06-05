import logo from "../../../assets/logo2.png";
import { Button, Button2 } from "../components/Button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-100/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-red-100"
          />
          <div>
            <p className="text-base font-bold leading-none text-gray-900 sm:text-lg">
              RedStream
            </p>
            <p className="text-xs text-gray-500">Donate blood, save lives</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button2 label="Login" onClick={() => navigate("/login")} />
          <Button label="Register" onClick={() => navigate("/registration")} />
        </div>
      </div>
    </header>
  );
};

export default Header;