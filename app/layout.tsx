import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = { title: "Grid App", description: "Next + Prisma + Grid" };
type RootLayoutType = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutType) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <Script id="realchart-license" strategy="beforeInteractive">
          {[
            `var realGrid2Lic = "upVcPE+wPOmtLjqyBIh9RkM/nBOseBrflwxYpzGZyYm9cY8amGDkiMnVeQKUHJDjW2y71jtk+wusmH0EXF7/BSDtCeQ9xhoX0l6QA0zLXMhcQ7OuMdFsaV7svsLh1nO8wZC9e6cWe2MKQZT/Z0n3iSR+dQr92CVep0O+D2+yWY7EWTBoTGHxQDYoebzoYRFI";`,
          ].join('\n')}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">
        <header className="p-5 bg-gray-100">
            <h1 className="text-lg font-bold">Grid App</h1>
        </header>
        <main className="p-5">
            {children}
        </main>
      </body>
    </html>
  );
}
