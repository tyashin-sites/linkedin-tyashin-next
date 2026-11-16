/**
 * Feature inventory. `status: 'live'` = implemented in the product code as read
 * on 2026-11-16 (docs/CONTENT-SOURCES.md). `status: 'soon'` renders with the
 * ComingSoon badge and is never described in the present tense.
 */

export type Status = 'live' | 'soon';

export interface Feature {
  title: string;
  body: string;
  status: Status;
}

export interface FeatureGroup {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  features: Feature[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: 'voice',
    eyebrow: 'Voice',
    title: 'It starts from who you are',
    lead: 'You describe yourself once. Every draft is written from that description, not from a generic prompt.',
    features: [
      {
        title: 'Profile and audience',
        body: 'Your business, your industry, who you want to reach, what sets you apart, the objection you hear most. Signing in with LinkedIn pre-fills what it can.',
        status: 'live',
      },
      {
        title: 'Tone settings',
        body: 'Pick a base tone (Professional, Casual, Bold or Inspirational), add the words that describe how you sound, and list the things you never say. A campaign can override the tone.',
        status: 'live',
      },
      {
        title: 'Knowledge bank',
        body: 'Add notes, links and text files about your work: case notes, product details, positions you hold. Drafts draw on it, so posts are about your work and not general industry filler.',
        status: 'live',
      },
      {
        title: 'Brand kit',
        body: 'Your logo and up to ten brand colours, kept in one place for anything visual.',
        status: 'live',
      },
      {
        title: 'Learning from your past LinkedIn posts',
        body: 'Reading what you have already published, so your voice settings start from how you write today.',
        status: 'soon',
      },
    ],
  },
  {
    id: 'campaigns',
    eyebrow: 'Campaigns',
    title: 'Topic tracks, each on its own schedule',
    lead: 'A campaign is one line of content: a topic, a set of themes and a posting schedule.',
    features: [
      {
        title: 'Separate schedules per campaign',
        body: 'Daily, weekly, chosen days of the week or monthly, at a set time, in your own time zone. Run a founder-story track on Tuesdays and a product track on Thursdays.',
        status: 'live',
      },
      {
        title: 'Topic guidance',
        body: 'Tell each campaign what it should cover and what to stay away from.',
        status: 'live',
      },
      {
        title: '17 content themes',
        body: 'Nine strategy themes and eight post formats, from Founder Story and Contrarian Take to Myth Buster and Behind the Scenes. Pick the ones that fit a campaign.',
        status: 'live',
      },
      {
        title: 'AI Studio chat',
        body: 'A chat workspace for one-off posts. Pick a theme, describe what you want to say, and work on the draft in conversation.',
        status: 'live',
      },
      {
        title: 'Smart timing',
        body: 'Choosing posting slots from when your own audience is active. Today you set the slots.',
        status: 'soon',
      },
    ],
  },
  {
    id: 'quality',
    eyebrow: 'Quality gate',
    title: 'A draft is checked before you see it',
    lead: 'Writing the post is one step out of four.',
    features: [
      {
        title: 'Research first',
        body: 'The agent looks up recent developments on the topic before it writes, so a post can refer to something that happened this week.',
        status: 'live',
      },
      {
        title: 'A second model judges the draft',
        body: 'A separate model scores each draft on novelty, groundedness, human voice and timeliness. A draft has to pass all four. A draft that falls short is revised once.',
        status: 'live',
      },
      {
        title: 'Humanizer pass',
        body: 'A final pass removes the tells of machine writing and strips formatting LinkedIn would show as raw symbols.',
        status: 'live',
      },
      {
        title: 'Failed drafts wait for you',
        body: 'A draft that still fails review is never auto-published. It is held for your review and you get an email.',
        status: 'live',
      },
      {
        title: 'Sources as a first comment',
        body: 'When a post draws on research, the source links are prepared as a first comment under the post. You can edit or remove the comment before it goes out.',
        status: 'live',
      },
    ],
  },
  {
    id: 'control',
    eyebrow: 'Control',
    title: 'Nothing goes out without your say',
    lead: 'Review is the default. Auto-publishing is a choice you make per campaign.',
    features: [
      {
        title: 'Review, edit, approve',
        body: 'Every draft can be edited, rescheduled, approved or rejected. By default nothing publishes until you approve it.',
        status: 'live',
      },
      {
        title: 'Opt-in auto-publish',
        body: 'Turn it on for a campaign and Tyashin drafts ahead of each slot and publishes the drafts that pass review. You choose how far ahead it drafts, from 1 to 72 hours.',
        status: 'live',
      },
      {
        title: 'It learns from edits and rejections',
        body: 'When you edit a draft or reject one with a reason, that becomes a quality rule applied to future drafts.',
        status: 'live',
      },
      {
        title: 'Email notifications',
        body: 'An email when a draft needs your review, before a post is due, when a post is published and if a post fails to publish.',
        status: 'live',
      },
      {
        title: 'Performance learning and analytics',
        body: 'Using how your published posts perform to shape new drafts, with a view of the numbers. Today the product shows your allowance usage only.',
        status: 'soon',
      },
    ],
  },
  {
    id: 'publishing',
    eyebrow: 'Publishing',
    title: 'Published the official way',
    lead: 'Posts reach LinkedIn through LinkedIn’s own OAuth API, the same route LinkedIn offers to approved apps.',
    features: [
      {
        title: 'Official LinkedIn API',
        body: 'You connect with LinkedIn’s own sign-in screen. No browser automation, no session cookies, no password shared with us.',
        status: 'live',
      },
      {
        title: 'Your own image on a post',
        body: 'Attach one image you upload to a post.',
        status: 'live',
      },
      {
        title: 'Designed visual cards and sourced photos',
        body: 'Cards laid out from the post itself (comparisons, lists, timelines, stats, quotes) and free-licensed photos with attribution.',
        status: 'soon',
      },
      {
        title: 'AI image generation and gallery',
        body: 'Generated images for posts and a gallery to manage them.',
        status: 'soon',
      },
      {
        title: 'Carousels',
        body: 'Multi-slide posts designed from your content.',
        status: 'soon',
      },
      {
        title: 'Video',
        body: 'Video posts.',
        status: 'soon',
      },
      {
        title: 'Company pages',
        body: 'Posting to a LinkedIn company page as an add-on to the Personal plan.',
        status: 'soon',
      },
    ],
  },
];

export const strategyThemes = [
  'Trend Riding', 'Contrarian Take', 'Product / Feature', 'Founder Story', 'Educational Series',
  'Social Proof', 'Engagement Play', 'Personal Narrative', 'Career Signal',
];

export const formatThemes = [
  'News Reaction', 'Unpopular Opinion', 'Behind the Scenes', 'Data Insight',
  'Win / Milestone', 'Myth Buster', 'Engagement Question', 'Launch / Announce',
];

/** What the tool never does. Verified against the product code. */
export const neverList = [
  { title: 'No browser automation', body: 'Nothing logs in as you or drives a browser on your behalf.' },
  { title: 'No auto-DMs', body: 'It does not send messages or connection requests.' },
  { title: 'No engagement pods', body: 'No traded likes, no comment rings.' },
  { title: 'No commenting on other people’s posts', body: 'It publishes your posts and, if you keep it, a sources comment under your own post.' },
];

/** The neutral buyer's checklist (replaces any tool-by-tool comparison). */
export const buyersChecklist = [
  {
    q: 'How does it reach LinkedIn?',
    why: 'Ask whether the tool publishes through LinkedIn’s official API or by automating a browser with your session. LinkedIn’s user agreement prohibits the second, and it is your account that carries the risk.',
    ours: 'Tyashin publishes through LinkedIn’s official OAuth API only.',
  },
  {
    q: 'What does it know about you before it writes?',
    why: 'A tool that starts from a blank prompt will sound like everyone else who used the same prompt. Ask what it stores about your voice and your work, and whether it improves when you correct it.',
    ours: 'Tyashin writes from your profile, tone settings and knowledge bank, and turns your edits and rejections into rules.',
  },
  {
    q: 'What happens to a weak draft?',
    why: 'Every writing tool produces a bad draft now and then. Ask what stands between that draft and your profile, especially if the tool can publish by itself.',
    ours: 'In Tyashin a second model reviews every draft, and a draft that fails is held for you. It is never auto-published.',
  },
];
