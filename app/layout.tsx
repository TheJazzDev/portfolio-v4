import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { profile } from '@/data/profile';
import './globals.css';

const title = `${profile.name}, ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL('https://jazzdev.vercel.app'),
  title,
  description: profile.summary,
  openGraph: { title, description: profile.summary, type: 'website' },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className='bg-page font-sans text-sm text-ink antialiased sm:text-base'>
        {children}
      </body>
    </html>
  );
}
