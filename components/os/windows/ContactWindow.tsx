"use client";

import { Mail, ExternalLink } from "lucide-react";

/* Inline SVG brand icons */
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const CONTACTS = [
  {
    iconType: "lucide" as const,
    icon: Mail,
    label: "Email",
    value: "agrawal6353@gmail.com",
    href: "mailto:agrawal6353@gmail.com",
  },
  {
    iconType: "custom" as const,
    customIcon: <GithubIcon />,
    label: "GitHub",
    value: "github.com/agrawal6353",
    href: "https://github.com/agrawal6353",
  },
  {
    iconType: "custom" as const,
    customIcon: <LinkedinIcon />,
    label: "LinkedIn",
    value: "linkedin.com/in/yash-agrawal",
    href: "https://www.linkedin.com/in/yash-agrawal/",
  },
  {
    iconType: "lucide" as const,
    icon: ExternalLink,
    label: "Resume",
    value: "Yash_Agrawal_Resume.pdf",
    href: "/Yash_Agrawal_Resume.pdf",
  },
];

export default function ContactWindow() {
  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 12 }}>
        ~/contact-info.txt
      </p>

      <p style={{ marginBottom: 16, fontSize: "0.8rem" }}>
        Feel free to reach out — I&apos;m always open to discussing new
        opportunities, collaborations, or interesting engineering challenges.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CONTACTS.map((c) => {
          const isExternal =
            c.href.startsWith("http") || c.href.startsWith("mailto:");
          const iconEl =
            c.iconType === "lucide" && c.icon ? (
              <c.icon size={16} strokeWidth={2.5} />
            ) : (
              c.customIcon
            );
          return (
            <a
              key={c.label}
              href={c.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: "2px solid #000000",
                padding: "10px 14px",
                textDecoration: "none",
                color: "#000000",
                transition: "var(--transition)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#000000";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
                e.currentTarget.style.color = "#000000";
              }}
            >
              {iconEl}
              <div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    opacity: 0.6,
                    marginBottom: 1,
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}
                >
                  {c.value}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
