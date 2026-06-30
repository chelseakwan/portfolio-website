import Bullets from "@/components/Bullets";

// Project card (PRD §5.3): thick top-border accent, serif title,
// monospace tools/date meta line, em-dash highlights.
export default function ProjectCard({ project }) {
  return (
    <article className="project">
      <h3 className="project__title">{project.title}</h3>
      <div className="project__meta">
        {project.tools} · {project.date}
      </div>
      <Bullets items={project.bullets} />
    </article>
  );
}
