"use client";

import { Trophy, Award, Star, Zap } from "lucide-react";

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: "LeetCode Top 6.5% Globally",
    metric: "1846 Rating",
    date: "2025 – Present",
    description:
      "Achieved a peak contest rating of 1846. Secured global rank #81 out of 34,000+ participants in LeetCode Weekly Contest 485. Consistently solving dynamic programming, graph theory, and advanced data structure challenges.",
    tag: "Algorithmic Excellence",
  },
  {
    icon: Star,
    title: "Codeforces Specialist",
    metric: "1351 Rating",
    date: "2025 – Present",
    description:
      "Earned the 'Specialist' title on Codeforces through consistent speed and precision in Div-2 and Div-3 competitive programming rounds under intense time constraints.",
    tag: "Competitive Programming",
  },
  {
    icon: Award,
    title: "ICPC Huawei Global Marathon",
    metric: "Rank #1311",
    date: "2025",
    description:
      "Competed against 36,000+ elite programmers worldwide in the prestigious ICPC Huawei Challenge, solving complex optimization and systems scheduling problems.",
    tag: "Global Competition",
  },
  {
    icon: Zap,
    title: "Academic Distinction — B.Tech CSE",
    metric: "9.54 CGPA",
    date: "2023 – 2027",
    description:
      "Maintaining an exceptional 9.54 / 10.00 cumulative grade point average at Pandit Deendayal Energy University (PDEU), ranking among the top academic performers in Computer Science & Engineering.",
    tag: "University Honors",
  },
];

export default function AchievementsWindow() {
  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 12 }}>
        ~/achievements.txt
      </p>

      <p style={{ marginBottom: 18, fontSize: "0.82rem", lineHeight: 1.6, color: "var(--text-muted)" }}>
        A summary of algorithmic benchmarks, global coding contest standings,
        and academic honors that demonstrate my problem-solving rigor and engineering speed.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {ACHIEVEMENTS.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.title}
              style={{
                border: "2px solid #000000",
                padding: "12px 14px",
                background: "var(--bg)",
                boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "6px 6px 0px 0px rgba(0,0,0,1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0px, 0px)";
                e.currentTarget.style.boxShadow = "4px 4px 0px 0px rgba(0,0,0,1)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      background: "#000000",
                      color: "#FFFFFF",
                      padding: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent size={14} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.88rem" }}>
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.62rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                      }}
                    >
                      {item.tag} · {item.date}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "var(--accent)",
                    color: "#000000",
                    fontWeight: 800,
                    fontSize: "0.78rem",
                    padding: "2px 8px",
                    border: "1.5px solid #000000",
                  }}
                >
                  {item.metric}
                </div>
              </div>

              <p
                style={{
                  fontSize: "0.76rem",
                  lineHeight: 1.5,
                  margin: 0,
                  color: "#000000",
                }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
