import type { Metadata } from "next";
import { Barlow, Dancing_Script } from "next/font/google";
import "./globals.css";
import AudioPlayer from "@/components/AudioPlayer";

const barlow = Barlow({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
});

const birthdayFont = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-birthday",
});

export const metadata: Metadata = {
  title: "Happy Birthday",
  description: "A special birthday experience",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎂</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${birthdayFont.variable} font-sans antialiased text-white bg-black`}>
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}
