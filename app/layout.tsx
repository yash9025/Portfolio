import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Agrawal — Full Stack Developer",
  description:
    "Interactive desktop OS portfolio of Yash Agrawal, Full Stack Developer at PDEU (CGPA 9.54). Built MediConnect, QueueForge & QuickAssist. LeetCode Top 6.5%, ICPC Rank 1311/36K+.",
  keywords: [
    "Yash Agrawal",
    "Full Stack Developer",
    "PDEU",
    "React",
    "Node.js",
    "Portfolio",
    "MediConnect",
    "QueueForge",
    "QuickAssist",
    "Desktop OS Portfolio",
  ],
  authors: [{ name: "Yash Agrawal", url: "mailto:agrawal6353@gmail.com" }],
  openGraph: {
    title: "Yash Agrawal — Full Stack Developer",
    description:
      "Interactive desktop OS portfolio — draggable windows, neubrutalist design. React · Node.js · TypeScript · AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Agrawal — Full Stack Developer",
    description:
      "Interactive desktop OS portfolio with draggable windows and neubrutalist design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{
          fontFamily: "var(--font-mono)",
          margin: 0,
          padding: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
