"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { NavLinks } from "../../Navlinks";

interface NavLink {
  title: string;
  path: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

const AdminNavContent = ({ navLinks }: MobileMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  //   const { isAuthenticated } = useAppSelector((state) => state.Auth);
  // const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        // You can add a body if your API requires it
        // body: JSON.stringify({}),
      });

      if (response.ok) {
        // Successful logout
        toast.success("Logged out successfully");

        // Reset auth state
        // dispatch(resetAuth());

        // Redirect to login page
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

  // Only render the button if user is authenticated and not on the login page
  if (pathname !== "/login") {
    return (
      <>
        <NavLinks navLinks={navLinks} />
        <Button onClick={handleLogout}>Logout</Button>
      </>
    );
  }

  // Return null if conditions are not met
  return null;
};

export default AdminNavContent;
