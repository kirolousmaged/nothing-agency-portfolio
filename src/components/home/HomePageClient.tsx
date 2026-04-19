'use client';

import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('./HomePage'), {
  ssr: false,
  loading: () => <div style={{ background: 'var(--color-bg-dark)', position: 'fixed', inset: 0 }} />,
});

export default function HomePageClient({ locale }: { locale: string }) {
  return <HomePage locale={locale} />;
}
