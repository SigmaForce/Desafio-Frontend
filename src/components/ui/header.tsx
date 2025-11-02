import Sun from "../../assets/icons/Sun.png";
import { Button } from "./button";
import { IconButton } from "./iconButton";

export function Header() {
  return (
    <div className="bg-mauve-dark-950/80  border-b border-[#F1E6FD]/18">
      <header className="container mx-auto flex justify-between items-center py-4 px-4 lg:px-0">
        <div className="flex items-center gap-4">
          <img
            src="/logo.svg"
            className="hidden lg:block"
            alt="Logo da Cubos"
          />
          <span className="font-sans">Movies</span>
        </div>
        <div className="flex items-center gap-2">
          <IconButton icon={<img src={Sun} className="size-6" />} />
          <Button variant="primary">Logout</Button>
        </div>
      </header>
    </div>
  );
}
