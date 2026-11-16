import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { LegalPageRenderer } from '@/components/LegalPage';

const DESCRIPTION = 'The terms of service for Tyashin for LinkedIn: your account, AI-generated content, the LinkedIn authorisation, billing and liability.';
export const metadata: Metadata = pageMetadata({ title: 'Terms and conditions', description: DESCRIPTION, path: '/terms-and-conditions' });

// Re-read from the platform legal API at most every 5 minutes.
export const revalidate = 300;

export default function Page() {
  return <LegalPageRenderer slug="terms-and-conditions" description={DESCRIPTION} />;
}
