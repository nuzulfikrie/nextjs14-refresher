'use client'

import Link from 'next/link'

export function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white">
          <nav className="container mx-auto px-4 py-6">
            <ul className="flex space-x-4">
              <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 py-6 text-center">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}