// Em-dash bulleted list (PRD §5.3) — used for experience and project highlights.
export default function Bullets({ items }) {
  return (
    <ul className="bullets">
      {items.map((item, i) => (
        <li key={i}>
          <span className="dash" aria-hidden="true">
            —
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
