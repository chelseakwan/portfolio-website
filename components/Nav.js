"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";

// Fixed global navigation (PRD §2.2). Desktop shows the slide-up reveal tabs;
// below 640px it collapses to an accessible hamburger menu (PRD §6.1).
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <nav className="nav" aria-label="Primary">
      <Link href="/" className="nav__brand" aria-label="Chelsea Kwan — home">
        CK.
      </Link>

      {/* Desktop tabs */}
      <div className="nav__tabs">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="tab"
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            <span className="tab__fill" aria-hidden="true" />
            <span className="tab__label">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="nav__toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Mobile stacked menu */}
      <div
        id="mobile-menu"
        className={`nav__mobile${open ? " is-open" : ""}`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav__mobile-link"
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
