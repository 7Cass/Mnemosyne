import type {Metadata} from 'next';
import {Nunito} from 'next/font/google';
import './globals.css';
import {ThemeProvider} from '@/providers/theme-provider';
import {cn} from '@/lib/utils';
import Header from '@/app/_components/Header';
import {Toaster} from '@/components/ui/toaster';

const nunito = Nunito({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Mnemo | Flashcards',
  description: 'Your minimalistic flashcards app',
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={cn([nunito.className, 'h-[calc(100vh_-_5rem)] bg-background font-sans antialiased'])}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <Header/>
      {children}
    </ThemeProvider>
    <Toaster/>
    </body>
    </html>
  );
}
