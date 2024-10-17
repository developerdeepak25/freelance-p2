'use client';

import { useAppDispatch } from "@/store/hooks";
import { login, resetAuth } from "@/store/slices/authSlice";
import { useEffect } from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(login());
      return () => {
        dispatch(resetAuth());
      };
    }, [dispatch]);
  return (
    <>
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* <nav>this is a nav</nav> */}
      {children}
    </>
  );
}
