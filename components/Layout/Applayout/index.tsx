"use client";
import React from "react";
import Navbar from "../navbars/Navbar";
import Footer from "../Footer";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
