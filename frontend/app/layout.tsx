import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import BadgeToast from "@/app/components/BadgeToast";
import { I18nProvider } from "@/lib/i18n";
import FloatingAvatarGuide from "@/app/components/FloatingAvatarGuide";
import { ThemeProvider } from "@/app/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vocatio | Orientación vocacional",
  description:
    "Plataforma de orientación vocacional con test, mentor IA y rutas personalizadas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/*
          beforeInteractive: corre antes de que React hidrate la página.
          Aplica la clase "dark" al <html> sin flash visible.
        */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vocatio-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else if(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <I18nProvider>
            {children}
            <BadgeToast />
            <FloatingAvatarGuide />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
