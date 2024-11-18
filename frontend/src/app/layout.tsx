import { Exo_2 } from 'next/font/google'
import './globals.css'

const exo = Exo_2({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-exo',
  display: 'swap',
})

export const metadata = {
  title: 'Portfolio | Kyureno',
  description: 'Personal portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={exo.variable}>
      <body className={`min-h-screen bg-[var(--bg-primary)] font-sans`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
} 