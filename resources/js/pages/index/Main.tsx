import About from "./sections/About";
import FrontPage from "./sections/FronPage";
import Projects from "./sections/Projects";

export default function Main () {
    return (
        <main className="flex-1 overflow-hidden scroll-smooth">
          <section className="w-full py-24">
            <FrontPage />
          </section>

          <section id="projects" className="w-full py-12 bg-muted/50">
            <Projects />
          </section>

          <section id="about" className="w-full py-12">
            <About />
          </section>
        </main>
    )
}