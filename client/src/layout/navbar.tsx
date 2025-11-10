import { Link, NavLink } from "react-router";
import { navLinks } from "../constants";
import CustomLayout from "./customLayout";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <header className="bg-primary shadow  fixed top-0 left-0 right-0 z-50">
      <CustomLayout>
        <nav className="py-3 flex justify-between items-center">
          <h1 className="font-bold tracking-wider text-lg">
            Access<span className="text-indigo-600">Check</span>
          </h1>

          <div className="hidden md:flex gap-5 font-bold">
            {navLinks.map((link) => (
              <NavLink to={link.href} key={link.name}>
                {link.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/check"
              className="px-5 py-2 md:px-10 md:py-2 rounded-full  bg-indigo-600 text-white"
            >
              Get started
            </Link>
            <div
              className="md:hidden cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </div>
        </nav>
        <div
          className={cn(
            "bg-white  md:hidden  ",
            open
              ? "flex flex-col items-center gap-10 my-10 w-screen h-screen font-bold text-2xl z-50"
              : "hidden"
          )}
        >
          {navLinks.map((link) => (
            <NavLink
              to={link.href}
              key={link.name}
              onClick={() => setOpen((prev) => !prev)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </CustomLayout>
    </header>
  );
};

export default Navbar;
