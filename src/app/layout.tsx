import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TyroTech - Self-Hosted Cybersecurity Learning Platform",
  description: "Production-grade, offline-first cybersecurity learning & hands-on lab platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-cyber-bg text-cyber-text antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
