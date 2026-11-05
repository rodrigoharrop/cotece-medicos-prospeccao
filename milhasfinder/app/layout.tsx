import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MilhasFinder',
  description: 'Buscador de passagens com milhas — Rodrigo Harrop',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
