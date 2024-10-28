"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { title: "Home", path: "/" },
  // { title: "About", path: "/about" },
  { title: "Executive Committee", path: "/executive-committee" },
  { title: "General Committee", path: "/general-committee" },
  { title: "Gallery", path: "/gallery" },
  { title: "Events", path: "/events" },
  { title: "Contact Us", path: "/contact" },
];

const Footer = () => {
  const footerRef = useRef<HTMLDivElement | null>(null); // Explicitly typing the ref

  useEffect(() => {
    const updatePadding = () => {
      const footerHeight = footerRef?.current?.offsetHeight; // Get the footer height
      document.body.style.paddingBottom = `${footerHeight}px`; // Set the body's padding directly
    };

    updatePadding(); // Set initial padding on mount

    window.addEventListener("resize", updatePadding); // Update padding on resize

    return () => {
      window.removeEventListener("resize", updatePadding); // Cleanup the listener
      document.body.style.paddingBottom = ""; // Reset padding on unmount
    };
  }, []);

  return (
    // <div className="bg-black-tint w-screen overflow-x-hidden mt-32">
    <div
      className="bg-black-tint w-screen overflow-x-hidden absolute bottom-0"
      ref={footerRef}
    >
      {/* <SectionWrapper className=" block"> */}
      <div className="flex justify-center sm:px-20 px-5">
        <div className="max-w-[1280px] grow">
          <div className="sm:py-10 py-5 flex  flex-col  sm:gap-10 gap-5">
            {/* links */}
            <div className="flex items-center justify-center gap-8 max-md:hidden">
              {navLinks.map((link) => {
                // const isActive = pathname === link.path;
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
            <div className="flex justify-between flex-col lg:flex-row items-center gap-6 max-sm:px-2">
              {/* copyright */}
              <p className=" text-gray-400 text-sm max-sm:text-center">
                © 2024 mydesignpublic. All rights reserved.
              </p>
              <p className="text-base font-normal text-gray-300 max-sm:text-center">
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
