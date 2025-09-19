import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import NavMenu from "./_ui/NavMenu"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Meal Planner",
  description: "Wrangle that pantry",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans grid grid-cols-[min-content_1fr] p-4`}
      >
        {/* old surrounding div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20" */}
        <header className="col-span-full">
          <h1>Logo</h1>
        </header>
        <NavMenu />
        <main className="bg-body-background p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
