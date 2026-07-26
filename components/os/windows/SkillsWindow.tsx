"use client";

const SKILL_CATEGORIES = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "C++", "Python", "Java"],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      "React.js",
      "Node.js",
      "Next.js",
      "Express.js",
      "LangChain",
      "Socket.io",
      "Tailwind CSS",
    ],
  },
  {
    label: "Databases & Cloud",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Pinecone / Vector DB",
    ],
  },
  {
    label: "DevOps & Tools",
    skills: [
      "Git / GitHub",
      "Docker",
      "GCP",
      "Postman",
      "Render / Vercel",
    ],
  },
  {
    label: "Practices",
    skills: [
      "RESTful API Design",
      "Agile Development",
      "System Reliability",
      "Debugging",
      "DSA",
      "OOP",
      "DBMS",
      "OS",
      "Computer Networks",
    ],
  },
];

export default function SkillsWindow() {
  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 12 }}>
        ~/skills.txt
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <p
              style={{
                fontWeight: 700,
                fontSize: "0.76rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 8,
                paddingBottom: 4,
                borderBottom: "1px solid #000000",
              }}
            >
              {cat.label}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cat.skills.map((s) => (
                <span key={s} className="tech-badge">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
