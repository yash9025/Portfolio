"use client";

export default function AboutWindow() {
  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 12 }}>
        ~/about-me.txt
      </p>

      {/* Intro */}
      <p style={{ marginBottom: 14, fontSize: "0.85rem", lineHeight: 1.6 }}>
        Hi, I&apos;m <strong>Yash Agrawal</strong> — a Full Stack Engineer &amp;
        creative technologist pursuing B.Tech in Computer Science &amp;
        Engineering at <strong>Pandit Deendayal Energy University</strong> (PDEU,
        CGPA: <strong>9.54</strong>).
      </p>

      <p style={{ marginBottom: 18, fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
        I specialize in building high-concurrency distributed backends, reactive
        real-time web applications, and AI-integrated workflows. I care deeply
        about zero-latency execution, clean system design, and interfaces that feel
        instantly tactile and alive.
      </p>

      {/* ─── Experience Snapshot ───────────────────────────────────────── */}
      <div
        style={{
          borderTop: "2px solid #000000",
          paddingTop: 14,
          marginBottom: 18,
        }}
      >
        <p className="eyebrow" style={{ marginBottom: 12 }}>
          ⚡ Production Impact &amp; Experience
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Abould */}
          <div
            style={{
              border: "1.5px solid #000000",
              padding: "10px 12px",
              background: "var(--bg)",
              boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                marginBottom: 6,
              }}
            >
              <span style={{ fontWeight: 800, fontSize: "0.82rem" }}>
                Full Stack Developer <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>@ Abould</span>
              </span>
              <span style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                Feb 2026 – Jul 2026
              </span>
            </div>
            <p style={{ fontSize: "0.76rem", lineHeight: 1.5, marginBottom: 8 }}>
              Shipped backend APIs for 2 production SaaS platforms (500+ active users). Slashed p95 API latency by <strong>40%</strong> through Redis caching &amp; DB query optimization. Engineered real-time Plaid synchronization and automated Stripe Maker–Checker payout workflows (cutting operational overhead by 65%).
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {["Node.js", "Redis", "PostgreSQL", "Stripe", "Plaid API"].map((t) => (
                <span key={t} className="tech-badge" style={{ fontSize: "0.58rem", padding: "1px 6px" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Xenovate */}
          <div
            style={{
              border: "1.5px solid #000000",
              padding: "10px 12px",
              background: "var(--bg)",
              boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                marginBottom: 6,
              }}
            >
              <span style={{ fontWeight: 800, fontSize: "0.82rem" }}>
                Web Dev Intern <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>@ Xenovate Tech Solutions</span>
              </span>
              <span style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                Aug 2025 – Oct 2025
              </span>
            </div>
            <p style={{ fontSize: "0.76rem", lineHeight: 1.5, marginBottom: 8 }}>
              Architected a Dockerized Business Intelligence platform on GCP (reducing deployment latency by <strong>40%</strong>). Built an optimized SaaS credit billing engine and deployed an AI email outreach automation composer (saving 90% manual drafting time).
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {["Docker", "GCP", "Next.js", "TypeScript", "Python / AI"].map((t) => (
                <span key={t} className="tech-badge" style={{ fontSize: "0.58rem", padding: "1px 6px" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Competitive programming highlights ────────────────────────── */}
      <div
        style={{
          borderTop: "2px solid #000000",
          paddingTop: 14,
        }}
      >
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          🏆 Competitive Programming Benchmarks
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          {[
            { label: "LeetCode", value: "1846", sub: "Top 6.5% globally" },
            { label: "Codeforces", value: "1351", sub: "Specialist" },
            { label: "ICPC Huawei", value: "#1311", sub: "36,000+ participants" },
            { label: "LC Weekly 485", value: "#81", sub: "34,000+ participants" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                border: "1px solid #000000",
                padding: "8px 10px",
              }}
            >
              <div
                style={{
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--text-muted)",
                  marginBottom: 2,
                }}
              >
                {item.label}
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "0.58rem",
                  color: "var(--text-light)",
                  marginTop: 2,
                }}
              >
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
