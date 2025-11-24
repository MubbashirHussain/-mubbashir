"use client";
import React, { useEffect, useRef } from "react";

import { RESUME_DATA } from "../data/resume";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Canvas Background */}


      {/* Ambient Green Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  Mubbashir
                </span>
                .
                <span className="inline-block ml-4 animate-wave origin-[70%_70%]">
                  👋
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Bring your UI to life with beautiful 3D scenes. Create immersive
                experiences that capture attention and enhance your design.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <a
                href={`mailto:${RESUME_DATA.contact.email}`}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#020617] text-white rounded-2xl overflow-hidden transition-all hover:scale-105"
              >
                {/* Glowing Border Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-green-400 to-primary opacity-70 blur-sm group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-[1px] rounded-2xl bg-[#020617]"></div>

                <span className="relative font-semibold text-lg tracking-wide group-hover:text-primary transition-colors">
                  Get in Touch
                </span>
                <ArrowRight className="relative w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Visual - Tilted Card */}
          <div className="relative hidden lg:block perspective-1000 group">
            {/* Decorative elements behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-500 rounded-[2rem] opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-700"></div>

            <div className="relative transform rotate-3 group-hover:rotate-1 transition-transform duration-500 ease-out">
              <div className="bg-[#e2e8f0] p-3 rounded-[2rem] shadow-2xl">
                <div className="bg-[#020617] rounded-[1.5rem] overflow-hidden relative aspect-[4/5] border border-slate-800">
                  {/* Stylized Avatar */}
                  <img
                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=Mubbashir&backgroundColor=b6e3f4&clothing=blazerAndShirt&eyebrows=default&eyes=default&mouth=default&top=shortHairShortFlat"
                    alt="Mubbashir Illustration"
                    className="w-full h-full object-cover transform scale-110 mt-10"
                  />

                  {/* Overlay Card Content (Optional tech accents) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#020617] to-transparent">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#18ffb0]"></div>
                      <span className="text-primary text-sm font-mono font-bold">
                        SYSTEMS_ONLINE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Orbs around card */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-float animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
