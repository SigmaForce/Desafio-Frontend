import { Outlet } from "react-router-dom";
import { Footer } from "./components/ui/footer";
import { Header } from "./components/ui/header";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
