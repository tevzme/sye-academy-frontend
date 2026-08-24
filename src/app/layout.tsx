import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../context/AppContext";

export const metadata: Metadata = {
  title: "SYE Academy - Enterprise Training Management",
  description: "System Enabler Division Engineering Onboarding & ISO Governance Platform",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
