import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suhas Uppala | Portfolio',
  description: 'AI/ML Enthusiast & Full-Stack Developer - Interactive Terminal Portfolio',
  keywords: ['portfolio', 'AI', 'ML', 'developer', 'full-stack', 'Suhas Uppala'],
  authors: [{ name: 'Suhas Uppala' }],
  openGraph: {
    title: 'Suhas Uppala | Portfolio',
    description: 'AI/ML Enthusiast & Full-Stack Developer - Interactive Terminal Portfolio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}