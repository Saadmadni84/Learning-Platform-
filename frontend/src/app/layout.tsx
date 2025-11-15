import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';

import Footer from '@/components/common/Footer';
import { ThemeProvider } from '@/components/theme-provider'
import ReduxProvider from '@/store/ReduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Acadevia - Gamified Learning Platform',
  description: 'Transform your learning experience with gamification',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReduxProvider>
            {/* ONLY Header and Navigation here - nowhere else! */}
            <Header />
            <main className="relative z-10">
              {children}
            </main>
            <Footer />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
