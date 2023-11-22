import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BRI Project",
  description: "A BRIW project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0"
        />
      </head>
      <body className={`${inter.className} bg-slate-50`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
