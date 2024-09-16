//'use client'

import './globals.css';
import Header from '@/components/ui/page/header';
import Footer from '@/components/ui/page/footer';


export const metadata = {
  title: 'My App',
  description: 'Generated by create next app',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
      <Header/>

        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>

      <Footer/>
      </body>
    </html>
  )
}