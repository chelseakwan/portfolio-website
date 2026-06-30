import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import site from "@/lib/site";
import Nav from "@/components/Nav";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Chelsea Kwan — Math & Business @ Northeastern",
    template: "%s — Chelsea Kwan",
  },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    title: "Chelsea Kwan",
    description: "Math, markets & data. Mathematics & Business @ Northeastern University.",
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Chelsea Kwan",
    description: "Math, markets & data. Mathematics & Business @ Northeastern University.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
