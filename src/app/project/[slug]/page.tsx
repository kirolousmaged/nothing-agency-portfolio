import { notFound } from "next/navigation";
import projects from "@/data/projects.json";
import SliceReveal from "@/components/common/SliceReveal";
import Link from "next/link";

interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main 
      style={{ 
        minHeight: "100vh", 
        paddingTop: "15rem", 
        paddingBottom: "5rem", 
        paddingLeft: "clamp(2rem, 10vw, 8rem)",
        paddingRight: "clamp(2rem, 10vw, 8rem)",
        backgroundColor: "var(--color-bg)",
        color: "white" 
      }}
    >
      {/* Background Shadow Title (Dynamic) */}
      <div className="shadow-title-vertical" style={{ opacity: 0.05 }}>
        {project.title}
      </div>

      <header style={{ marginBottom: "8rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <span style={{ 
            fontSize: "0.875rem", 
            textTransform: "uppercase", 
            letterSpacing: "0.3em", 
            opacity: 0.5 
          }}>
            {project.category}
          </span>
          <h2 style={{ 
            fontSize: "clamp(3rem, 12vw, 8rem)", 
            fontWeight: 900,
            textTransform: "uppercase",
            lineHeight: 0.9,
            letterSpacing: "-0.05em"
          }}>
            {project.title}
          </h2>
        </div>
        <p style={{ 
          maxWidth: "800px", 
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)", 
          fontWeight: 300, 
          opacity: 0.8, 
          lineHeight: 1.6,
          marginTop: "3rem"
        }}>
          {project.description}
        </p>
      </header>

      {/* Hero Reveal Section */}
      <section style={{ 
        position: "relative", 
        width: "100%", 
        aspectRatio: "16/9",
        maxHeight: "80vh",
        marginBottom: "15rem"
      }}>
        <SliceReveal 
          src={project.image} 
          alt={project.title} 
          slices={10} 
          direction="vertical" 
        />
      </section>

      {/* Project Content Grid */}
      <section style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "10rem",
        alignItems: "start"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          <div>
            <h3 style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.4em", marginBottom: "2rem" }}>Concept</h3>
            <p style={{ opacity: 0.6, lineHeight: 2, fontSize: "1.1rem" }}>
              Exploring the boundaries between physical form and digital representation. 
              {project.title} represents a shift in visual perception, utilizing 
              stark contrasts and minimalist composition to define a new brand narrative.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.4em", marginBottom: "2rem" }}>Strategy</h3>
            <p style={{ opacity: 0.6, lineHeight: 2, fontSize: "1.1rem" }}>
               Developed for the Nothing Agency, this project emphasizes the power of 
               negative space and brutalist layout design. Every pixel serves a purpose in 
               this high-fidelity digital ecosystem.
            </p>
          </div>
        </div>
        
        <div style={{ 
          position: "relative", 
          aspectRatio: "4/5", 
          backgroundColor: "#111", 
          overflow: "hidden" 
        }}>
           <SliceReveal 
            src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" 
            alt="Process image" 
            slices={5} 
            direction="horizontal" 
            delay={0.5}
           />
        </div>
      </section>

      {/* Navigation Footer */}
      <footer style={{ 
        marginTop: "20rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        borderTop: "1px solid rgba(255,255,255,0.1)", 
        paddingTop: "4rem" 
      }}>
        <Link href="/" className="hover-target" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.3em", opacity: 0.6 }}>
          Back to Portfolio
        </Link>
        <div style={{ display: "flex", gap: "2rem", opacity: 0.5 }}>
          <a href="#" className="hover-target" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>Twitter</a>
          <a href="#" className="hover-target" style={{ fontSize: "0.75rem", textTransform: "uppercase" }}>Behance</a>
        </div>
      </footer>
    </main>
  );
}
