import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "H.O.S. Shell",
  description: "Three-pane OS shell layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
