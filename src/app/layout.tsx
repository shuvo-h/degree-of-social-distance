import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // title: "This is next learn app",
  title: {
    absolute:"",                  // to ignore the 'template' option in any child page, in that child page, in title meta use absolute property, then the template prefix will skip
    default:"Next App DEFAULT title",   // which page don't have meta title, will use this default
    template:"%s | DYNAMIC title"     // Dynamic title, the '%s' will replace the child title, and the "| DYNAMIC title" part will always be with the title
  },
  description: "Through this app, We are learning next 14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-200 py-4">
          <Navbar />
        </header>
        <br />
        {children}
        <br />
        <footer className="bg-blue-200 py-4">Root Footer</footer>
      </body>
    </html>
  );
}
