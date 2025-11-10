import CustomLayout from "./customLayout";

const Footer = () => {
  return (
    <footer className="bg-primary py-5 ">
      <CustomLayout>
        <div className="flex items-center justify-between flex-wrap">
          <p className="hover:text-indigo-600 transition-all font-bold">
            &copy; {new Date().getFullYear()} AccessCheck. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-semibold text-sm">
            <a href="#" className="hover:text-indigo-600 transition-all">
              Contact Us
            </a>

            <a href="#" className="hover:text-indigo-600 transition-all">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-indigo-600 transition-all">
              Trademark Policy
            </a>
          </div>
        </div>
      </CustomLayout>
    </footer>
  );
};

export default Footer;
