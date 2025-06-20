import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Logo({ textColor, logoColor }) {
  return (
    <Link to="/">
      <div className="flex flex-row gap-1 h-20 items-center pl-4">
        <Heart className={`h-8 w-8 ${logoColor}`} />
        <h1 className={`text-2xl font-bold ${textColor}`}>MediCare Connect</h1>
      </div>
    </Link>
  );
}

export default Logo;
