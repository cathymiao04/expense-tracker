import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "/components/ui/sonner"

const inter = IBM_Plex_Sans({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Expense Tracker",
  description: "Manage your finances",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
