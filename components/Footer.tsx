import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center gap-8 bg-zinc-950 py-24 text-white">
            <h2 className="text-4xl font-bold md:text-6xl">Let's Talk</h2>
            <div className="flex gap-6">
                <a
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 transition-colors hover:bg-white hover:text-black"
                >
                    <Github size={20} />
                </a>
                <a
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 transition-colors hover:bg-white hover:text-black"
                >
                    <Linkedin size={20} />
                </a>
                <a
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 transition-colors hover:bg-white hover:text-black"
                >
                    <Twitter size={20} />
                </a>
                <a
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-800 transition-colors hover:bg-white hover:text-black"
                >
                    <Mail size={20} />
                </a>
            </div>
            <p className="text-sm text-zinc-500">
                © {new Date().getFullYear()} Mubbashir. All rights reserved.
            </p>
        </footer>
    );
}
