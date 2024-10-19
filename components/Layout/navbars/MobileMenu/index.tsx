"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";

interface NavLink {
  title: string;
  path: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.Auth);

  const closeSheet = () => {
    setIsOpen(false);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Successful logout
        toast.success("Logged out successfully");
        router.push("/login");
      } else {
        // Handle errors
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
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
        <div className="grid w-full p-4 gap-4 place-content-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xl font-bold text-nowrap text-center ${
                  isActive
                    ? "text-primary-light"
                    : "text-my-para hover:text-gray-950"
                } `}
                onClick={closeSheet}
              >
                {link.title}
              </Link>
            );
          })}
          {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
        </div>
      </SheetContent>
    </Sheet>
  );
};

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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

export default MobileMenu;
