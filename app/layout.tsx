import type React from "react"
import type { Metadata } from "next"
import { Old_Standard_TT, Crimson_Text } from "next/font/google"
import "./globals.css"

// Initialize the Old Standard TT font for headings
const oldStandard = Old_Standard_TT({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-old-standard",
})

// Initialize Crimson Text for body content
const crimsonText = Crimson_Text({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crimson",
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
    <html lang="en" className={`${oldStandard.variable} ${crimsonText.variable}`}>
      <body className="antialiased font-body">{children}</body>
    </html>
  )
}
