// Site-wide constants used for metadata, navigation, and SEO.
// Update siteUrl to the production domain before launch.

const site = {
  name: "Chelsea Kwan",
  // Used as metadataBase for resolving Open Graph / canonical URLs.
  url: "https://chelseakwan.com",
  description:
    "Chelsea Kwan — Mathematics & Business Administration student at Northeastern concentrating in Fintech. Strategic finance, data engineering, and quantitative research.",
};

// Primary navigation (PRD §2.1). Order is the site's section sequence.
export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
  { label: "Résumé", href: "/resume" },
];

export default site;
