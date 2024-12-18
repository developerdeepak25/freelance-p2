import { NavLinks } from "../Navlinks";
import MobileMenu from "../MobileMenu";
import NavLogo from "../NavLogo";

const navLinks = [
  { title: "Home", path: "/" },
  // { title: "About", path: "/about" },
  // { title: "Executive Committee", path: "/executive-committee" },
  // { title: "General Committee", path: "/general-committee" },
  { title: "Executive Members", path: "/executive-committee" },
  { title: "General Members", path: "/general-committee" },
  { title: "Gallery", path: "/gallery" },
  { title: "Events", path: "/events" },
  { title: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  return (
    // <div className="h-16 bg-white w-screen overflow-x-hidden flex flex-col items-center fixed top-0 z-50 shadow-md shadow-gray-200/50">
    <div className="h-20 bg-white w-screen overflow-x-hidden flex flex-col items-center fixed top-0 z-50 shadow-md shadow-gray-200/50">
      <div className="flex justify-center px-5 w-full h-full sm:px-20">
        <div className="max-w-[1280px] grow h-full flex justify-between items-center">
          {/* logo */}
          {/* <div className="text-4xl font-black">Logo.</div> */}
          <NavLogo />

          {/* links */}
          {/* <div className=" gap-7 hidden  lg:flex "> */}
          <div className=" gap-7 hidden  xl:flex ">
            <NavLinks navLinks={navLinks} />
          </div>

          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
