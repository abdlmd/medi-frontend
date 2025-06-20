import { Heart, LogOut, User } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/authStore";

function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  function handleClick() {
    logout();
    navigate("/");
  }
  function handleProfile() {
    navigate("/profile");
  }
  return (
    <header className="flex flex-row justify-between gap-1 shadow-lg py-18 h-20 items-center pl-4 backdrop-blur-3xl">
      <Logo textColor={"text-gray-900"} logoColor={"text-blue-600"} />
      {user && (
        <div className="flex">
          <Button
            className="bg-white shadow-none  hover:bg-slate-200"
            onClick={handleClick}
          >
            <LogOut className=" text-black " />
          </Button>
          <Button
            className="bg-white shadow-none  hover:bg-slate-200"
            onClick={handleProfile}
          >
            <User className="text-black" />
          </Button>
        </div>
      )}
      {!isLoginPage && !user && (
        <Link to={"/login"}>
          <Button className="bg-white text-black mr-5 hover:bg-slate-200 ">
            Sign In
          </Button>
        </Link>
      )}
    </header>
  );
}

export default Header;
