import CustomLayout from "./customLayout";

const Footer = () => {
  return (
    <footer className="bg-white py-4 text-black">
      <CustomLayout>
        <div className="flex flex-col  md:flex-row items-center justify-between  text-center space-y-1">
          <p className="font-bold text-sm sm:text-base">
            &copy; {new Date().getFullYear()} AccessCheck. All rights reserved.
          </p>

          <p className="text-sm font-medium">
            Developed with{" "}
            <span className="text-red-500 animate-pulse">❤️</span> by{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-all font-semibold"
            >
              Hemanth
            </a>
          </p>
        </div>
      </CustomLayout>
    </footer>
  );
};

export default Footer;
