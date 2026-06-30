// Page eyebrow/kicker + heading (PRD §2.1, §5). The kicker (e.g. "01 — About")
// is a page identifier retained for visual continuity across routes.
export default function PageHeader({ kicker, title }) {
  return (
    <>
      <p className="eyebrow">{kicker}</p>
      <h1 className="h2">{title}</h1>
    </>
  );
}
