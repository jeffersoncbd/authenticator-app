import Menu from "@/components/Menu";
import { Session } from "@/services/session";
import ThemeModeProvider from "@/services/themeMode";
import { Toast } from "@/services/toast";
import { Box, Flex } from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuthTor",
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
        <Session.Provider>
          <ThemeModeProvider>
            <Toast.Provider>
              <Flex
                p="4"
                height="100vh"
                width="100vw"
                direction="column"
              >
                <Menu />
                <Box maxWidth="800px" width="100%" mx="auto" style={{ flex: "1" }}>
                  {children}
                </Box>
              </Flex>
            </Toast.Provider>
          </ThemeModeProvider>
        </Session.Provider>
      </body>
    </html>
  );
}
