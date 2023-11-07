// packages
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

// components
import { ToastProvider } from "@/components/providers/toaster-provider";

// css
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ToastProvider />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
