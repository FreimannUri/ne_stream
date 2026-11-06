import About from "./components/About";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Viewer from "@/app/components/Viewer";

export default async function Home() {
  return (
    <main className="flex flex-col">
      <Viewer />

      {/* <About /> */}
      {/* <Hero /> */}
      {/* <Services /> */}
      {/* <Contact /> */}
      {/* <Footer /> */}
    </main>
  );
}
