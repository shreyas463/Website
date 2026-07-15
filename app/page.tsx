import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Architecture } from "@/components/sections/architecture";
import { Publications } from "@/components/sections/publications";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Contact } from "@/components/sections/contact";
import { Chatbot } from "@/components/ui/chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Architecture />
        <Publications />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
