/** FAQ — one source for /faq, the home teaser and the FAQPage JSON-LD. */
export interface FaqItem {
  q: string;
  a: string;
  /** Shown in the home page teaser. */
  home?: boolean;
}

export const faqGroups: { heading: string; items: FaqItem[] }[] = [
  {
    heading: 'Getting started',
    items: [
      {
        q: 'What is Tyashin for LinkedIn?',
        a: 'A writing and publishing tool for your personal LinkedIn profile. It learns how you write from your profile, tone settings and knowledge bank, drafts posts in that voice, checks each draft, and publishes through LinkedIn’s official API once you approve.',
        home: true,
      },
      {
        q: 'How do I start?',
        a: 'Sign in with LinkedIn (or with email and a password), answer the setup questions about who you are and how you sound, create your first campaign and review your first draft. Your first two posts are free and need no card.',
      },
      {
        q: 'Do I have to connect my LinkedIn account?',
        a: 'To publish, yes. You connect through LinkedIn’s own sign-in and permission screen. We never see or store your LinkedIn password.',
      },
    ],
  },
  {
    heading: 'Writing and voice',
    items: [
      {
        q: 'Will the posts sound like me?',
        a: 'That is the point of the setup. Drafts are written from your profile, your tone settings, the things you say you never say, and your knowledge bank. When you edit a draft or reject one with a reason, that becomes a rule for future drafts. The first drafts are a starting point and they get closer as you correct them.',
        home: true,
      },
      {
        q: 'What is the knowledge bank?',
        a: 'Your private notes about your work: text you paste, links and text files. Drafts draw on it so that posts are about what you do.',
      },
      {
        q: 'What checks does a draft go through?',
        a: 'The agent researches recent developments on the topic, writes a draft, and a second model scores it on novelty, groundedness, human voice and timeliness. A draft that falls short is revised once. A final pass removes the tells of machine writing. A draft that still fails is held for your review and is never auto-published.',
        home: true,
      },
      {
        q: 'What are the 17 content themes?',
        a: 'Nine strategy themes (Trend Riding, Contrarian Take, Product / Feature, Founder Story, Educational Series, Social Proof, Engagement Play, Personal Narrative, Career Signal) and eight post formats (News Reaction, Unpopular Opinion, Behind the Scenes, Data Insight, Win / Milestone, Myth Buster, Engagement Question, Launch / Announce).',
      },
    ],
  },
  {
    heading: 'Publishing and control',
    items: [
      {
        q: 'Does anything get posted without my approval?',
        a: 'Not unless you choose that. Review and approve is the default. Auto-publish is a setting you turn on per campaign, and even then a draft that fails review is held for you.',
        home: true,
      },
      {
        q: 'Can I edit a draft?',
        a: 'Yes. You can edit the text, change the scheduled time, approve it or reject it.',
      },
      {
        q: 'Where do a post’s sources go?',
        a: 'When a post draws on research, the source links are prepared as a first comment under your post. You can edit or remove that comment before the post goes out.',
      },
      {
        q: 'Can it post images, carousels or video?',
        a: 'You can attach one image you upload. Designed visual cards, sourced photos, AI-generated images, carousels and video are coming soon and are listed on the roadmap.',
      },
      {
        q: 'Can it post to my company page?',
        a: 'Not yet. Company pages are coming soon as an add-on. Today a subscription covers one personal LinkedIn profile.',
      },
    ],
  },
  {
    heading: 'Safety and data',
    items: [
      {
        q: 'Is it safe for my LinkedIn account?',
        a: 'Tyashin publishes through LinkedIn’s official OAuth API, the route LinkedIn provides for approved apps. It does not automate a browser, does not send DMs or connection requests, and does not take part in engagement pods.',
        home: true,
      },
      {
        q: 'How is my LinkedIn connection stored?',
        a: 'LinkedIn gives us access tokens when you connect. They are encrypted at rest with AES-256-GCM. You can disconnect LinkedIn from the app at any time.',
      },
      {
        q: 'How do I delete my account and data?',
        a: 'Email privacy@aapastech.com from the address on your account and we will delete it. There is no self-serve delete button in the app yet.',
      },
    ],
  },
  {
    heading: 'Pricing and billing',
    items: [
      {
        q: 'What does it cost?',
        a: 'One plan, Personal: US$145 a month for one LinkedIn profile. Regional prices apply in India, the Eurozone, Canada, Australia and New Zealand, Japan, the Gulf states and Kuwait, and are listed on the pricing page.',
        home: true,
      },
      {
        q: 'How does the free offer work?',
        a: 'You write your first 2 posts free with no card. After that you start a 3-day free trial, which needs a card. You are not charged until the trial ends, and you can cancel before then. After the trial the plan bills monthly.',
        home: true,
      },
      {
        q: 'Is there a limit on how much I can generate?',
        a: 'The plan includes a monthly AI allowance, shown in the app as a percentage used. If you need more in a month you can buy a top-up of 20%, 50% or 100% of the allowance.',
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes. Cancel from the Billing page in the app. There is no contract.',
      },
      {
        q: 'How do I pay from India?',
        a: 'Indian customers pay in rupees through Razorpay. Everyone else pays by card through Stripe.',
      },
    ],
  },
];

export const allFaqs: FaqItem[] = faqGroups.flatMap((g) => g.items);
export const homeFaqs: FaqItem[] = allFaqs.filter((f) => f.home).slice(0, 6);
