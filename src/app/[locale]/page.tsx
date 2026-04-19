import HomePageClient from '@/components/home/HomePageClient';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HomePageClient locale={locale} />;
}
