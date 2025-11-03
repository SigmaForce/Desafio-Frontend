import { Link } from "react-router-dom";
import Sun from "../../assets/icons/sun.png";
import { useAuth } from "../../context/AuthContext";
import { Button } from "./button";
import { Logo } from "./logo";

export function Header() {
  const { logout, isAuthenticated } = useAuth();

  return (
    <div className="bg-mauve-dark-950/80  border-b border-[#F1E6FD]/18">
      <header className="container mx-auto flex justify-between items-center py-4 px-4 lg:px-0">
        <Link
          to={`${isAuthenticated ? "/movies" : "/"}`}
          className="flex items-center gap-4"
        >
          <Logo />
          <span className="font-mono text-xl text-[#EEEEF0] font-bold">
            Movies
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="secondary">
            <img src={Sun} className="size-6" />
          </Button>
          <Button onClick={logout} size="lg" variant="primary">
            Logout
          </Button>
        </div>
      </header>
    </div>
  );
}
