/**
 * Use-case personas — ONE data file drives /use-cases, /use-cases/[slug],
 * generateStaticParams, the sitemap and the footer. Example campaigns use the
 * product's real theme names (src/data/features.ts). No outcomes are promised.
 */
export interface Persona {
  slug: string;
  label: string;
  title: string;
  lead: string;
  situation: string;
  helps: { title: string; body: string }[];
  campaigns: { name: string; themes: string; schedule: string }[];
  knowledge: string[];
  caution: string;
}

export const personas: Persona[] = [
  {
    slug: 'founders',
    label: 'Founders',
    title: 'For founders building in public',
    lead: 'You have the stories. You do not have a spare hour every morning to write them up.',
    situation:
      'Most founders post in bursts: three posts in a good week, then nothing for two months because the product needed you. The ideas were never the problem. A customer call, a pricing mistake, a hire you nearly got wrong: that is the material. What is missing is the time to turn it into a post.',
    helps: [
      { title: 'Your notes become drafts', body: 'Drop the week’s notes into the knowledge bank. Drafts are written from them, in the tone you set.' },
      { title: 'Separate tracks for separate goals', body: 'One campaign for the company story, another for product news, each on its own days.' },
      { title: 'You stay the editor', body: 'Read, change a line, approve. Your edits become rules for the next draft.' },
    ],
    campaigns: [
      { name: 'What we learned this week', themes: 'Founder Story, Behind the Scenes', schedule: 'Tuesdays' },
      { name: 'Product in the open', themes: 'Product / Feature, Launch / Announce', schedule: 'Thursdays' },
      { name: 'Where I disagree', themes: 'Contrarian Take, Unpopular Opinion', schedule: 'Every other Monday' },
    ],
    knowledge: ['Notes from customer calls', 'Your changelog or release notes', 'The pitch you give investors, in your own words'],
    caution: 'Keep approval on for anything about fundraising, customers or the team. Those posts deserve a human read.',
  },
  {
    slug: 'consultants',
    label: 'Consultants and freelancers',
    title: 'For consultants and freelancers',
    lead: 'Your expertise is the product. LinkedIn is where prospects check whether you have any.',
    situation:
      'Client work always wins the calendar, so your own marketing goes quiet exactly when you are busiest. Then a project ends and the pipeline is empty. Steady posting about the problems you solve is the fix everyone knows and few keep up.',
    helps: [
      { title: 'Posts grounded in your method', body: 'Put your frameworks and anonymised case notes in the knowledge bank. Drafts refer to how you work.' },
      { title: 'A schedule that runs through busy months', body: 'Set the days once per campaign. Drafts are ready when you have ten minutes to review.' },
      { title: 'Your phrasing, kept', body: 'List the words you never use. The humanizer pass and your own edits keep the consultancy clichés out.' },
    ],
    campaigns: [
      { name: 'Problems I get called for', themes: 'Educational Series, Myth Buster', schedule: 'Mondays and Wednesdays' },
      { name: 'From the work', themes: 'Social Proof, Behind the Scenes', schedule: 'Fridays' },
    ],
    knowledge: ['Anonymised project write-ups', 'Your service pages', 'Answers you keep giving in sales calls'],
    caution: 'Never put client-confidential material in the knowledge bank. Anonymise first.',
  },
  {
    slug: 'executives',
    label: 'Executives',
    title: 'For executives',
    lead: 'People read your profile before they take the meeting, accept the offer or sign the contract.',
    situation:
      'You have a view on your industry and a comms team with other priorities. Writing weekly is not a realistic use of your time, and handing your name to a generic writing tool is not a risk you will take.',
    helps: [
      { title: 'Review is the default', body: 'Nothing is published until you approve it. You can keep it that way permanently.' },
      { title: 'Checked before it reaches you', body: 'Each draft is researched and reviewed by a second model for groundedness and voice before it lands in your queue.' },
      { title: 'Sources attached', body: 'Posts that draw on research carry their source links as a first comment, which you can edit or remove.' },
    ],
    campaigns: [
      { name: 'Industry view', themes: 'Trend Riding, News Reaction', schedule: 'Tuesdays' },
      { name: 'How we run things', themes: 'Personal Narrative, Educational Series', schedule: 'Thursdays' },
    ],
    knowledge: ['Talks and interviews you have given', 'Positions you have taken publicly', 'Topics that are off limits, listed as things you never say'],
    caution: 'Check with your communications or legal team about what you may say publicly before you turn on auto-publish.',
  },
  {
    slug: 'career-changers',
    label: 'Career changers',
    title: 'For career changers',
    lead: 'Your profile says where you have been. Your posts can say where you are going.',
    situation:
      'When you move fields, your job history argues against you. Recruiters and hiring managers see the old title. Writing regularly about the new field, what you are learning and what carries over from the old one, is how you change the first impression.',
    helps: [
      { title: 'A track for the new field', body: 'A campaign focused on the field you are moving into, in your own voice, not a course-certificate voice.' },
      { title: 'Recent, not recycled', body: 'The agent researches recent developments before drafting, so you are commenting on what is happening now.' },
      { title: 'Honest about your level', body: 'Set your tone and your never-say list so drafts do not claim experience you do not have.' },
    ],
    campaigns: [
      { name: 'Learning in public', themes: 'Educational Series, Career Signal', schedule: 'Mondays and Thursdays' },
      { name: 'What transfers', themes: 'Personal Narrative, Myth Buster', schedule: 'Wednesdays' },
    ],
    knowledge: ['Notes from courses and projects', 'Problems you solved in your previous field', 'The roles you are aiming for'],
    caution: 'Read every draft for accuracy. In a new field, a confident mistake costs more than a quiet week.',
  },
  {
    slug: 'b2b-sales',
    label: 'B2B sales',
    title: 'For B2B sales professionals',
    lead: 'Buyers look you up before they reply. Give them something to find.',
    situation:
      'Cold outreach lands better when the person recognises your name. That takes showing up in their feed with something useful, week after week, alongside a full quota. Most reps manage it for a fortnight.',
    helps: [
      { title: 'Useful posts, not pitches', body: 'Campaigns built around your buyers’ problems, drawing on the product knowledge you add.' },
      { title: 'No automation that risks your account', body: 'It publishes posts through the official API. It does not send DMs or connection requests, and it never will.' },
      { title: 'Ten minutes a week', body: 'Review the queue, fix a line, approve.' },
    ],
    campaigns: [
      { name: 'Problems my buyers have', themes: 'Educational Series, Data Insight', schedule: 'Tuesdays and Thursdays' },
      { name: 'From the field', themes: 'Social Proof, Engagement Question', schedule: 'Fridays' },
    ],
    knowledge: ['Objections you hear and how you answer them', 'Approved customer stories', 'Your product’s positioning in plain words'],
    caution: 'Follow your company’s social media policy, and only use customer stories you are allowed to share.',
  },
  {
    slug: 'coaches',
    label: 'Coaches',
    title: 'For coaches',
    lead: 'Clients hire the coach they feel they already know.',
    situation:
      'Your business runs on trust, and trust builds slowly through what you share. You have a method and years of sessions to draw on. Sitting down to write three posts a week between clients is another matter.',
    helps: [
      { title: 'Your method, in your words', body: 'Describe your approach and the phrases you use. Drafts follow them.' },
      { title: 'Themes that suit teaching', body: 'Educational Series, Myth Buster and Engagement Question map naturally onto coaching content.' },
      { title: 'It improves with correction', body: 'Reject a draft that sounds like a motivational poster and say why. That becomes a rule.' },
    ],
    campaigns: [
      { name: 'One idea a week', themes: 'Educational Series, Myth Buster', schedule: 'Mondays' },
      { name: 'Questions clients ask', themes: 'Engagement Question, Personal Narrative', schedule: 'Wednesdays and Fridays' },
    ],
    knowledge: ['Your framework, step by step', 'Common client situations with identifying details removed', 'What you believe that other coaches do not'],
    caution: 'Never include anything a client told you in confidence, even paraphrased.',
  },
  {
    slug: 'students',
    label: 'Students',
    title: 'For students building a job-seeking brand',
    lead: 'A recruiter will look at your profile. A few months of thoughtful posts is a better answer than a blank page.',
    situation:
      'You have projects, coursework and opinions about your field, and no track record yet. Posting about what you are building and learning shows how you think, which is what an entry-level hiring manager is trying to find out.',
    helps: [
      { title: 'Project notes become posts', body: 'Add notes on what you built and what went wrong. Drafts are written from them.' },
      { title: 'A voice that sounds like a person', body: 'Set a casual tone and a never-say list so you do not sound like a press release.' },
      { title: 'Try it before you pay', body: 'Your first two posts are free with no card, so you can judge the drafts first.' },
    ],
    campaigns: [
      { name: 'What I am building', themes: 'Behind the Scenes, Win / Milestone', schedule: 'Tuesdays' },
      { name: 'What I am learning', themes: 'Educational Series, Career Signal', schedule: 'Fridays' },
    ],
    knowledge: ['Project write-ups and READMEs as text', 'The kinds of roles you want', 'Topics from your course you could explain to a friend'],
    caution: 'The Personal plan is priced for working professionals. Use the two free posts and the trial to decide whether it is worth it for you right now.',
  },
];

export const PERSONA_SLUGS = personas.map((p) => p.slug);

export function getPersona(slug: string): Persona | undefined {
  return personas.find((p) => p.slug === slug);
}
