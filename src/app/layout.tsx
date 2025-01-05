import type { Metadata } from "next"
import "./globals.css"
import React from "react"
import Footer from "../components/footer"
import Header from "../components/header"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "SOE@UOWD Webring",
  description: "A collection of portfolio websites from UOWD School of Engineering students",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-sf-pro antialiased bg-black min-h-screen">
        <Providers>
          <Header />
          <div className="relative min-h-screen pb-12">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
