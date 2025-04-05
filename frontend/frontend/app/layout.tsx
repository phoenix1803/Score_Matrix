import "../styles/globals.css";
import React from "react";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";
import type { ReactNode } from "react";
import ChatbotModal from "../components/ChatbotModal";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ScoreMatrix",
  description: "Automated Answer Sheet Checking System",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* Add favicon */}
        <link rel="icon" href="D:/frontend/public/logo.svg" />
        <meta name="description" content="Automated Answer Sheet Checking System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ScoreMatrix</title>
      </Head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <AuthProvider>
            <Navbar />
            <main className="flex-grow pb-8">{children}</main>
            <Footer />
            <ChatbotModal />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
