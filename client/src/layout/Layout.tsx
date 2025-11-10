import Navbar from "./navbar";
import { Outlet } from "react-router";
import Footer from "./footer";
import ScrollToTop from "@/components/ScrollToTop";

const Layout = () => {
  return (
    <main className="relative">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
