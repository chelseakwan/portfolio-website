import PageHeader from "@/components/PageHeader";
import resume from "@/content/resume";

export const metadata = {
  title: "Résumé",
  description:
    "Download Chelsea Kwan's one-page résumé — education, experience, projects, and skills.",
  openGraph: {
    title: "Résumé — Chelsea Kwan",
    description:
      "One page. Education, experience, projects, and skills — download the PDF.",
  },
};

export default function ResumePage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHeader kicker="04 — Résumé" title="The full resume." />
        <p className="resume-lead">
          One page. Education, experience, projects, and skills — download the
          PDF.
        </p>
        <p className="resume-updated">Last updated {resume.lastUpdated}</p>
        <a
          className="btn btn--download"
          href={resume.path}
          download={resume.downloadName}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true" style={{ fontSize: "13px" }}>
            ↓
          </span>
          <span>Download PDF</span>
        </a>
      </div>
    </div>
  );
}
