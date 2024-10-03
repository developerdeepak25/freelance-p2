"use client";
import React from "react";
import SectionWrapper from "../SectionWrapper";
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

const Footer = () => {
  const pathname = usePathname();

  return (
    // <div className="bg-black-tint w-screen overflow-x-hidden mt-32">
    <div className="bg-black-tint w-screen overflow-x-hidden">
      {/* <SectionWrapper className=" block"> */}
      <div className="flex justify-center px-20">
        <div className="max-w-[1280px] grow">
          <div className="py-10 flex  flex-col  gap-10">
            {/* links */}
            <div className="flex items-center justify-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`${
                      // isActive
                      //   ? "text-white font-semibold"
                      // :
                      "text-white hover:text-slate-200 font-normal text-sm"
                    } `}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </div>

            {/* divider */}
            <div className="bg-white h-[1px]"></div>

            {/* copyright and credits */}
            <div className="flex justify-between">
              {/* copyright */}
              <p className=" text-gray-400 text-sm">
                © 2024 mydesignpublic. All rights reserved.
              </p>
              <p className="text-base font-normal text-gray-300">
                Designed and developed by{" "}
                <a
                  href="https://www.linkedin.com/in/deepak-aashrmiya/"
                  target="_blank"
                  className="text-dev-link"
                >
                  Deepak
                </a>{" "}
                &{" "}
                <a
                  href="https://www.linkedin.com/in/prashantsingh29/"
                  target="_blank"
                  className="text-dev-link"
                >
                  Code-Prashant
                </a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* </SectionWrapper> */}
    </div>
  );
};

export default Footer;
