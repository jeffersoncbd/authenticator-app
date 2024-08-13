import Menu from "@/components/Menu";
import { Session } from "@/services/session";
import { Toast } from "@/services/toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authenticator",
  description: "Manage your applications and their users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Toast.Provider>
          <Session.Provider>
            <div className="p-4 h-screen">
              <Menu />
              {children}
            </div>
          </Session.Provider>
        </Toast.Provider>
      </body>
    </html>
  );
}
