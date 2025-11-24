"use client";

import Image from "next/image";
export default function GlitchImage() {
  return (
    <div className="group relative w-full h-full flex">
      {/* Base Images */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out mx-5 self-end rounded-xl"
        style={{
          margin: "10px 20px",
          borderRadius: "20px",
          borderColor: "#ffffff1e",
        }}
      >
        <Image
          src="/hero-person.png"
          alt="Hero background Image"
          fill
          className="object-contain w-full opacity-100 group-hover:opacity-30 transition-all duration-500 ease-in-out rounded"
        />
      </div>

      <Image
        src="/person-blue.png"
        alt="Hero background Image"
        fill
        className="object-contain group-hover:-translate-x-[10px] opacity-50 transition-all duration-500 ease-in-out"
      />
      <Image
        src="/person-red.png"
        alt="Hero background Image"
        fill
        className="object-contain group-hover:-translate-x-[5px] group-hover:-translate-y-[7px] opacity-50 transition-all duration-500 ease-in-out"
      />
      <Image
        src="/person.png"
        alt="Hero background Image"
        fill
        className="object-contain absolute"
      />
    </div>
  );
}
