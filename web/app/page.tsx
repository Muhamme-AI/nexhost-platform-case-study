import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Console } from "@/components/Console";
import { Stack } from "@/components/Stack";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Console />
        <Stack />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
