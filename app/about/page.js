import PageHeader from "@/components/PageHeader";
import Row from "@/components/Row";
import profile from "@/content/profile";
import education from "@/content/education";
import skills from "@/content/skills";
import personal from "@/content/personal";

export const metadata = {
  title: "About",
  description: profile.aboutIntro,
  openGraph: { title: "About — Chelsea Kwan", description: profile.aboutIntro },
};

// Split the about heading on its connector so the Dotfont theme can render it
// as "+" instead of "&" (see .amp rules in globals.css). The words stay sourced
// from profile.aboutHeading; only the connector glyph is themed.
const [HEADING_BEFORE, HEADING_AFTER] = profile.aboutHeading.split("&");

const SKILL_GROUPS = [
  { label: "Programming & Query", key: "programming" },
  { label: "Frameworks & Libraries", key: "frameworks" },
  { label: "Tools", key: "tools" },
  { label: "Databases", key: "databases" },
];

export default function AboutPage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHeader
          kicker="01 — About"
          title={
            <>
              {HEADING_BEFORE}
              <span className="amp amp--and" aria-hidden="true">&amp;</span>
              <span className="amp amp--plus" aria-hidden="true">+</span>
              <span className="sr-only">and</span>
              {HEADING_AFTER}
            </>
          }
        />
        <p className="lead">{profile.aboutIntro}</p>

        <Row label="Education">
          <div className="serif-lg">{education.school}</div>
          <div className="row__note">
            {education.department} · {education.location}
          </div>
          <div className="row__detail">{education.degree}</div>
          <div style={{ marginTop: 6 }}>
            Concentration: {education.concentration} &nbsp;·&nbsp; Minor:{" "}
            {education.minor} &nbsp;·&nbsp; GPA: {education.gpa}
          </div>
          <div className="row__meta">
            <strong>Awards &amp; Activities:</strong>{" "}
            {education.awards.join(", ")}
          </div>
          <div className="row__meta" style={{ marginTop: 10 }}>
            <strong>Relevant Courses:</strong> {education.courses.join(", ")}
          </div>
        </Row>

        <Row label="Technical Skills">
          <div className="stack">
            {SKILL_GROUPS.map((group) => (
              <div key={group.key}>
                <div className="sub">{group.label}</div>
                {skills[group.key].join(", ")}
              </div>
            ))}
          </div>
        </Row>

        <Row label="Beyond Work">
          <div className="stack">
            <div>
              <div className="sub">Interests</div>
              {personal.interests.join(", ")}
            </div>
            <div>
              <div className="sub">Languages</div>
              {personal.languages.join(", ")}
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}
