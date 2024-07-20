import { Metadata } from "next";
import { Inter, Space_Grotesk as spaceGroteskk } from "next/font/google";
import React from "react";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = spaceGroteskk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Ayna Chat",
  description: "A RealTime Chat App that echoes the messages of users",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <AuthProvider>{children}</AuthProvider>
        <div className="text-red-600">
          <Toaster />
        </div>
      </body>
    </html>
  );
}
