import Image from "next/image";
import Link from "next/link";
import React from "react";
// import LogoImage from "./public/image/logo.jpeg";

const NavLogo = () => {
  return (
    <Link href="/">
      {/* <div className="text-4xl font-black">Logo.</div> */}
      <div className="flex items-center gap-2">
        <div className="aspect-square h-16">
          <Image
            src={"/image/logo.jpeg"}
            alt="Logo"
            width={200}
            height={200}
            className="h-full w-full"
          />
        </div>
        <p className="text-base font-bold line-clamp-2 text-my-heading leading-none">
          MANOHARPURA <br /> MOKSHDHAM VIKAS SAMITI
        </p>
      </div>
    </Link>
  );
};

export default NavLogo;
