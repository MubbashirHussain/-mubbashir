import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black relative">
      <Hero />
      {/* <iframe
        src="https://www.unicorn.studio/embed/57oFutZbJAehM73CyZYV"
        width="100vw"
        height="100vh"
        className="absolute top-0 left-0"
      ></iframe> */}
      {/* <About />
      <Projects />
      <Footer /> */}
    </main>
  );
}
