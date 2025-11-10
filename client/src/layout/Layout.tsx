import Navbar from "./navbar";
import { Outlet } from "react-router";
import Footer from "./footer";

const Layout = () => {
  return (
    <main className="relative">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
