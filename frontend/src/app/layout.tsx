import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flow-API | 统一API聚合平台",
  description: "Flow-API是一个强大的API聚合平台，提供统一接口访问多种第三方服务，简化集成，减少复杂性，节省开发时间。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Import highlight.js styles via CDN */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Use github theme in light mode */
            @import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css');
            
            /* Use atom-one-dark theme in dark mode */
            @media (prefers-color-scheme: dark) {
              @import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css');
            }
            
            /* Also use dark theme when HTML tag has dark class */
            html.dark .hljs {
              background-color: #282c34;
              color: #abb2bf;
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
