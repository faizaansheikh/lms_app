import React from "react";
import XButton from "../XButton";

function Hero() {
  return (
    <section
      className="relative h-125 w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero.jpg')",
      }}
    >
      {/* Dark overlay (ONLY affects image) */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="max-w-3xl px-6 text-white flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            
            <span className="block text-secondary"> Welcome to Elite Medical Academy</span>
          </h1>

          {/* <p className="mt-4 text-lg md:text-xl text-gray-200">
            Premium artificial jewellery for everyday & bridal luxury.
          </p> */}

          <div className="mt-4">
           <XButton label='Enroll Now' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
