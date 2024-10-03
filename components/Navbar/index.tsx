'use client';
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Executive Committee", path: "/executive-committee" },
  { title: "General Committee", path: "/general-committee" },
  { title: "Gallery", path: "/gallery" },
  { title: "Events", path: "/events" },
  { title: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="h-16 bg-white w-screen overflow-x-hidden flex flex-col items-center fixed top-0 z-50">
      <div className="w-full h-full flex justify-between items-center px-20">
        {/* logo */}
        <div className="text-4xl font-black">Logo.</div>
        {/* links */}
        <div className="flex gap-7">
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
      </div>
    </div>
  );
};

export default Navbar;
