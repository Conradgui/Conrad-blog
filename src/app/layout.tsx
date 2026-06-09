import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conrad Space",
  description: "Conrad 的 AI 产品经理作品集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

