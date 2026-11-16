import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { GRIEVANCE_EMAIL } from '@/lib/grievance';
import { JsonLd } from '@/components/JsonLd';
import { LegalShell } from '@/components/LegalPage';
import { GrievanceForm } from '@/components/GrievanceForm';

const TITLE = 'Grievance officer';
const DESCRIPTION =
  'How to complain about Tyashin for LinkedIn, about content published through it, or about how we handle personal data: our Grievance Officer, response times and where to appeal.';
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/grievance' });

/** Officer for all Aapastech products (same person named on the company's other product sites). */
const OFFICER = 'Shikha Gupta';

export default function GrievancePage() {
  const mail = <a href={`mailto:${GRIEVANCE_EMAIL}?subject=Grievance`}>{GRIEVANCE_EMAIL}</a>;
  return (
    <>
      <JsonLd page={{ path: '/grievance', title: TITLE, description: DESCRIPTION }} />
      <LegalShell title={TITLE} path="/grievance">
        <p>
          Write to us if you have a complaint about {siteConfig.name}, about content published through it, or about how
          we handle your personal data. Complaints from anyone are welcome, whether or not you have an account.
        </p>

        <h2 id="officer">Grievance Officer</h2>
        <p>
          {OFFICER}
          <br />
          {siteConfig.company.legalName}
          <br />
          Email: {mail}
        </p>

        <h2 id="how">How to complain</h2>
        <p>
          Email us with “Grievance” in the subject line, or use the form below. Tell us your name and how to reach you,
          the post or account the complaint is about, what happened, and what you would like us to do. For a request
          about your personal data, tell us the email address you use with us so we can find your records without asking
          for more than we need.
        </p>

        <GrievanceForm lang="en" />

        <h2 id="next">What happens next</h2>
        <ul>
          <li>We acknowledge your complaint within 24 hours and give you a reference number.</li>
          <li>We resolve it within 7 days.</li>
          <li>
            If you ask us to remove content that breaks our rules for users (see the{' '}
            <a href="/terms-and-conditions">terms</a>), we act within 36 hours. Claims about who owns the content, or
            about intellectual property, can take up to 7 days because we need to hear from both sides.
          </li>
          <li>
            If content shows you in a private or sexual way, or pretends to be you, including images changed with AI,
            report it and we will act within 2 hours.
          </li>
          <li>
            Requests to see, correct or delete your personal data, or to withdraw consent, are answered within one month.
            Most take far less.
          </li>
        </ul>
        <p>
          Posts published through {siteConfig.name} appear on LinkedIn, on the profile of the member who approved them.
          We can stop our service publishing for an account and delete what we hold. To have a post removed from
          LinkedIn itself, you can also report it to LinkedIn.
        </p>

        <h2 id="appeal">If you are not satisfied</h2>
        <ul>
          <li>
            Under India’s Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, you
            can appeal our decision to the Grievance Appellate Committee at{' '}
            <a href="https://gac.gov.in" rel="noopener">
              gac.gov.in
            </a>{' '}
            within 30 days of hearing from us.
          </li>
          <li>
            For personal data, you can also complain to the data protection authority where you live after using this
            process.
          </li>
        </ul>
      </LegalShell>
    </>
  );
}
