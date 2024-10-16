"use client";
import React from "react";

const Map = () => {
  return (
    <div className=" w-full h-[420px] sm:pt-20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14243.517787231478!2d75.54031845281169!3d26.811966928227175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c48180ef8d527%3A0x1ab8f0dfab7b62c5!2sBagru%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1728375524642!5m2!1sen!2sin"
        width="100%"
        height="450"
        // style="border:0;"
        // allowfullscreen=""
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        // referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
