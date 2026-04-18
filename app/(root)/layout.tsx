import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mensavil",
  description: "Your platform for managing subscriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
