import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarePulse AI | Omnichannel Healthcare & Telemedicine Platform",
  description: "Next-generation healthcare platform featuring AI symptom assessment, 1-on-1 virtual doctor consultations, live biometrics tracking, digital EHR records, and express pharmacy delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
