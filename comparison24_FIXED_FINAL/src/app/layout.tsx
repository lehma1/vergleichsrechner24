import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { AuthProvider } from '@/context/auth-context';
import CookieBanner from '@/components/cookie-banner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Comparison24 | Independent Financial Comparison',
  description: 'Compare festgeld deposits and tagesgeld accounts from over 50 banks. Secure, independent, and current.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
