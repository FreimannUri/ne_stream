import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Viewer from "@/app/components/Viewer";

export default async function Home() {
  return (
    <main className="flex flex-col">
      <Viewer />

      {/* <About /> */}
      {/* <Navbar /> */}
      {/* <Hero /> */}
      {/* <Services /> */}
      {/* <Projects /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </main>
  );
}
