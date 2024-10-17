'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = ({navLinks}: {navLinks: {title: string; path: string}[]}) => {
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
};
