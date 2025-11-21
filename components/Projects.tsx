"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Project One",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        description: "A futuristic web application built with Next.js and WebGL.",
    },
    {
        title: "Project Two",
        category: "UI/UX Design",
        image: "https://images.unsplash.com/photo-1558655146-d09347e0c766?auto=format&fit=crop&w=800&q=80",
        description: "Interactive dashboard with real-time data visualization.",
    },
    {
        title: "Project Three",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
        description: "Cross-platform mobile application for productivity.",
    },
    {
        title: "Project Four",
        category: "E-commerce",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
        description: "Modern e-commerce platform with 3D product previews.",
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: "-300vw",
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "2000 top",
                    scrub: 0.6,
                    pin: true,
                },
            }
        );

        return () => {
            pin.kill();
        };
    }, []);

    return (
        <section className="overflow-hidden bg-zinc-950 text-white">
            <div ref={triggerRef}>
                <div
                    ref={sectionRef}
                    className="flex h-screen w-[400vw] flex-row relative"
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="flex h-screen w-screen items-center justify-center p-10"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
                                <div className="relative aspect-video w-full md:w-1/2 overflow-hidden rounded-2xl">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col gap-4 md:w-1/2">
                                    <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                                        {project.category}
                                    </span>
                                    <h2 className="text-5xl md:text-7xl font-bold text-zinc-100">
                                        {project.title}
                                    </h2>
                                    <p className="text-lg text-zinc-400 max-w-md">
                                        {project.description}
                                    </p>
                                    <button className="w-fit rounded-full border border-zinc-700 px-8 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:bg-white hover:text-black">
                                        View Case Study
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
