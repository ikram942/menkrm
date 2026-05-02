import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";
import { CurrencyProvider } from "@/components/CurrencyContext";
import SessionProvider from "@/components/SessionProvider";
import { CartProvider } from "@/components/panel";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mensavil",
  description: "Your platform for managing subscriptions",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <CurrencyProvider>
            <NextIntlClientProvider messages={messages}>
              <CartProvider>
                {children}
                <Toaster position="top-right" richColors />
              </CartProvider>
            </NextIntlClientProvider>
          </CurrencyProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
