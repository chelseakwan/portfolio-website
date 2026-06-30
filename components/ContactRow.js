// Contact link/info row (PRD §5.4): large serif text left, small mono tag right.
// Renders as a link when `href` is provided, or static text otherwise.
export default function ContactRow({ href, external, tag, children }) {
  if (!href) {
    return (
      <div className="contact-link contact-link--static">
        <span>{children}</span>
        <span className="contact-tag">{tag}</span>
      </div>
    );
  }

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a className="contact-link" href={href} {...externalProps}>
      <span>{children}</span>
      <span className="contact-tag">{tag}</span>
    </a>
  );
}
