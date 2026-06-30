import PageHeader from "@/components/PageHeader";
import Row from "@/components/Row";
import Bullets from "@/components/Bullets";
import ProjectCard from "@/components/ProjectCard";
import experience from "@/content/experience";
import projects from "@/content/projects";

export const metadata = {
  title: "Work & Projects",
  description:
    "Chelsea Kwan's work experience in strategic finance, data engineering, and quantitative research, plus featured analytical projects.",
  openGraph: {
    title: "Work & Projects — Chelsea Kwan",
    description:
      "Work experience across strategic finance, data engineering, and quantitative research, plus featured projects.",
  },
};

export default function WorkPage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHeader kicker="02 — Experience" title="Where I’ve worked." />

        {experience.map((job) => (
          <Row
            key={`${job.company}-${job.role}`}
            labelNode={
              <div>
                <div className="serif-lg">{job.company}</div>
                <div className="meta-role">{job.role}</div>
                <div className="meta-place">
                  {job.location} · {job.dateRange}
                </div>
              </div>
            }
          >
            <Bullets items={job.bullets} />
          </Row>
        ))}

        <h2 className="proj-head">Projects</h2>
        <div className="projects">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
