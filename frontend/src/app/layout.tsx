import type { Metadata } from 'next';
import { Inter, Poppins, Open_Sans, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Providers } from './providers'
import ReduxProvider from '@/components/ReduxProvider'

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
});
const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans'
});
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat'
});

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
      <body className={`${inter.className} ${poppins.variable} ${openSans.variable} ${montserrat.variable}`}>
        <ReduxProvider>
          <Providers>
            <Header />
            <main className="relative z-10">
              {children}
            </main>
            <Footer />
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
