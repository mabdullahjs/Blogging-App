import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Providers from '@/lib/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blogging App',
  description: 'Simple blogging app using nextjs with simple crud using mongodb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className} suppressHydrationWarning={true}>
          <Navbar />
          <main>
            {children}
          </main>
        </body>
      </Providers>
    </html>
  )
}