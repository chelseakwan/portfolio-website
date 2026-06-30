// Résumé download config.
//
// To publish a new résumé: replace the file at public/resume.pdf with your
// new PDF (keep the same filename), update `lastUpdated` below, commit, and
// redeploy. No component or layout changes are required.

const resume = {
  // Fixed static path — keep this filename stable across updates.
  path: "/resume.pdf",
  // Friendly name applied to the downloaded file via the `download` attribute.
  downloadName: "Chelsea Kwan Resume.pdf",
  // Surfaced on the /resume page so visitors can gauge freshness.
  lastUpdated: "June 2026",
};

export default resume;
