import type React from "react"
import type { Metadata } from "next"
import { EB_Garamond, Inter } from "next/font/google"
import "./globals.css"

// Initialize EB Garamond for headings
const ebGaramond = EB_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
})

// Initialize Inter for body content (similar to Geist Sans)
const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Shubham Gaur",
  description: "Full-Stack Engineer specializing in AI/ML, reinforcement learning, and secure scalable system design",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${inter.variable}`}>
      <body className="antialiased font-body">{children}</body>
    </html>
  )
}
