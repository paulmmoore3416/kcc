import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kubernetes Command Center',
  description: 'Professional Kubernetes cluster administration and observation platform',
  keywords: ['kubernetes', 'k8s', 'cluster management', 'observability', 'finops'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
