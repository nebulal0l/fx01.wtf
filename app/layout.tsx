import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "fx01.wtf | Premium Access",
  description: "Exclusive premium access portal",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={GeistMono.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'