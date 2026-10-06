import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Design } from "@/components/Design";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Swim } from "@/components/Swim";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Swim />
        <Design />
        <About />
      </main>
      <Contact />
    </>
  );
}
