"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navLinks = [
  { title: "Home", path: "/" },
  // { title: "About", path: "/about" },
  { title: "Executive Committee", path: "/executive-committee" },
  { title: "General Committee", path: "/general-committee" },
  { title: "Gallery", path: "/gallery" },
  { title: "Events", path: "/events" },
  { title: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const closeSheet: ()=> void = () => {
    setIsOpen(false);
  };

  return (
    <div className="h-16 bg-white w-screen overflow-x-hidden flex flex-col items-center fixed top-0 z-50 shadow-md shadow-gray-200/50">
      {/* <div className="max-w-[1280px] h-full flex justify-between items-center px-20"> */}
      <div className="flex justify-center px-5 w-full h-full sm:px-20">
        {/* <div className="max-w-[1280px] grow"> */}
        <div className="max-w-[1280px] grow h-full flex justify-between items-center">
          {/* logo */}
          <div className="text-4xl font-black">Logo.</div>
          {/* links */}
          <div className=" gap-7 hidden  lg:flex ">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${
                    isActive
                      ? "text-primary-light font-bold"
                      : "text-my-para hover:text-gray-950 font-bold"
                  } `}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="lg:hidden w-[90%] sm:max-w-[550px] grid items-center"
            >
              <div className="grid w-full p-4 gap-4 place-content-center  ">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`text-xl  font-bold text-nowrap text-center ${
                        isActive
                          ? "text-primary-light  "
                          : "text-my-para hover:text-gray-950 "
                      } `}
                      onClick={closeSheet}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default Navbar;
