import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalPageRenderer } from '@/components/LegalPage';

const DESCRIPTION = 'Terms and conditions of the Tyashin sales referral programme operated by Aapastech Pvt Ltd.';
export const metadata: Metadata = pageMetadata({ title: 'Sales referral programme terms', description: DESCRIPTION, path: '/sales-terms' });

// Re-read from the platform legal API at most every 5 minutes.
export const revalidate = 300;

export default function Page() {
  return <LegalPageRenderer slug="sales-terms" description={DESCRIPTION} />;
}
