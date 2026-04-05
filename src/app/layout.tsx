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
  title: "Premium Birthday Experience",
  description: "A premium birthday experience web application",
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
