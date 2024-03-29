import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ProductProvider } from "../contexts/ProductContext";
import { CategoryProvider } from "@/contexts/CategoryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <CategoryProvider>
        <ProductProvider>
          <ClerkProvider>
            <body className={inter.className}>
              <Navbar />
              {children}
              <Footer />
            </body>
          </ClerkProvider>
        </ProductProvider>
      </CategoryProvider>
    </html>
  );
}
