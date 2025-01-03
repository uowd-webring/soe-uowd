import type { Metadata } from "next"
import "./globals.css"
import React from "react"

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
    <html lang="en">
      <body className="font-sf-pro antialiased">
        {children}
      </body>
    </html>
  )
}
