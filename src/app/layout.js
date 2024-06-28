// packages
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

// components
import { ToastProvider } from "@/components/providers/toaster-provider";

// css
import TopLoaderProvider from "@/components/providers/TopLoaderProvider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://acme.com"),
  title:
    "Edumentor - Your Gateway to Online Learning | Buy and Sell Courses Easily",
  description:
    "Unlock the world of online education with Edumentor! Explore a diverse marketplace where students can effortlessly purchase courses to enhance their skills, while teachers can showcase and sell their expertise. Join us for a seamless learning and teaching experience.",
  keywords:
    "Online course marketplace, Buy and sell courses, E-learning platform, Educational marketplace, Digital learning hub, Student-friendly courses, Teacher-led education, Skill enhancement, Online education marketplace, Edumentor courses",
  openGraph: {
    images:
      "https://res.cloudinary.com/dn2pqzag1/image/upload/v1701402467/Edumentor/djmhabmhtzc3oxb8n0jh.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          <TopLoaderProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
