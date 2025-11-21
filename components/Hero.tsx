"use client";
import Hero3D from "./Hero3D";

export default function Hero() {
    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center bg-blue-200">
            {/* <Hero3D /> */}
            <div className="z-10 flex flex-col items-center gap-6">
                <h1
                    className="text-6xl font-bold tracking-tighter sm:text-8xl md:text-9xl bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent"
                >
                    MUBBASHIR
                </h1>
                <p
                    // ref={subtitleRef}
                    className="max-w-lg text-xl text-zinc-400 sm:text-2xl"
                >
                    Creative Developer & UI/UX Enthusiast. Crafting digital experiences
                    that leave a mark.
                </p>
            </div>
            <div className="absolute bottom-10 animate-bounce text-zinc-500">
                Scroll Down
            </div>
        </section>
    );
}
