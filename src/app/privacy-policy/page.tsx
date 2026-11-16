import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalPageRenderer } from '@/components/LegalPage';

const DESCRIPTION = 'How Tyashin for LinkedIn collects, uses, stores and protects your information, including the LinkedIn data you connect.';
export const metadata: Metadata = pageMetadata({ title: 'Privacy policy', description: DESCRIPTION, path: '/privacy-policy' });

// Re-read from the platform legal API at most every 5 minutes.
export const revalidate = 300;

export default function Page() {
  return <LegalPageRenderer slug="privacy-policy" description={DESCRIPTION} />;
}
