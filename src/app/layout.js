import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BRI Project",
  description: "A BRIW project",
};

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
