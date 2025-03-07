import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import {Prompt} from 'next/font/google'
import Footer from "@/components/Navbar/Footer";


const prompt = Prompt({
  weight : '400',
  subsets : ['latin','thai']
})

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "แหล่งท่องเที่ยวจังหวัดมหาสารคาม",
  description: "แหล่งท่องเที่ยวจังหวัดมหาสารคาม",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning>
      <body
        className={`${prompt.className} antialiased`}
        >
        <Providers>


        <Navbar/>
        <main className="container">
          
        {children}
        <Footer/>
        </main>
        </Providers>
      </body>
    </html>
        </ClerkProvider>
  );
}
