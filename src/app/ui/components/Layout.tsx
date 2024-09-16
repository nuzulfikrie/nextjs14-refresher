import React, { ReactNode } from 'react';
import Footer from './Page/footer';
import Header from './Page/header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
