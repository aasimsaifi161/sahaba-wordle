import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sahaba Wordle - Daily Companion Guessing Game",
  description: "A Wordle-style daily guessing game themed around the Sahaba (companions) of the Prophet Muhammad (PBUH). Learn history, test your knowledge, and share your score!",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased transition-colors duration-200`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        {children}
        <Toaster 
          position="top-center" 
          richColors
          toastOptions={{
            style: {
              borderRadius: '0.75rem',
              fontWeight: 600,
            }
          }}
        />
      </body>
    </html>
  );
}
