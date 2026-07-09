import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

const bodyFont = VT323({
  variable: "--font-body",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevDungeon",
  description: "Turn coding practice into an RPG adventure.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${pixelFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
