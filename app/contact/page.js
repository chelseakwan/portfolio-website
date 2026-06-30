import PageHeader from "@/components/PageHeader";
import ContactRow from "@/components/ContactRow";
import contact from "@/content/contact";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Chelsea Kwan — email, LinkedIn, and location.",
  openGraph: {
    title: "Contact — Chelsea Kwan",
    description: "Email, LinkedIn, and location.",
  },
};

export default function ContactPage() {
  return (
    <div className="page">
      <div className="wrap">
        <PageHeader kicker="03 — Contact" title="Let’s talk." />
        <div>
          <ContactRow href={`mailto:${contact.email}`} tag="Email">
            {contact.email}
          </ContactRow>
          <ContactRow href={contact.linkedin.url} external tag="LinkedIn">
            {contact.linkedin.label}
          </ContactRow>
          <ContactRow tag="Location">{contact.location}</ContactRow>
        </div>
      </div>
    </div>
  );
}
