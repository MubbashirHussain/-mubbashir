"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        const words = text.innerText.split(" ");
        text.innerHTML = words
            .map((word) => `<span class="inline-block opacity-20">${word}</span>`)
            .join(" ");

        const spans = text.querySelectorAll("span");

        gsap.to(spans, {
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                end: "bottom 50%",
                scrub: true,
            },
        });
    }, []);

    return (
        <section className="flex min-h-screen items-center justify-center bg-black px-4 py-24">
            <div className="max-w-4xl">
                <p
                    ref={textRef}
                    className="text-4xl leading-tight font-medium text-white md:text-6xl"
                >
                    I am a creative developer passionate about building digital
                    experiences that matter. With a focus on motion, interaction, and
                    clean aesthetics, I turn complex problems into simple, beautiful
                    solutions. Let's build something amazing together.
                </p>
            </div>
        </section>
    );
}
