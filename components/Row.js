// Reusable two-column row: 290px label column + flexible content column
// (PRD §3.3). Collapses to a single stacked column below 720px via CSS.
// Pass `label` for a simple text label column, or `labelNode` to render a
// custom left column (e.g. an experience entry's company/role block).
export default function Row({ label, labelNode, children }) {
  return (
    <div className="row">
      <div className={label ? "row__label" : undefined}>
        {labelNode ?? label}
      </div>
      <div className="row__body">{children}</div>
    </div>
  );
}
