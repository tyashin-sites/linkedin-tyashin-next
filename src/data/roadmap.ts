/**
 * Not live. Every item here is shown ONLY with the ComingSoon treatment.
 * No dates: none are committed.
 */
export interface RoadmapItem {
  title: string;
  body: string;
  today: string;
}

export const roadmap: { group: string; items: RoadmapItem[] }[] = [
  {
    group: 'Formats and visuals',
    items: [
      {
        title: 'Designed visual cards and sourced photos',
        body: 'Cards laid out from the post itself, and free-licensed photos with attribution, attached to a post for you.',
        today: 'You can attach one image you upload yourself.',
      },
      {
        title: 'AI image generation and gallery',
        body: 'Generated images for posts, with a gallery to keep and reuse them.',
        today: 'Not available.',
      },
      {
        title: 'Carousels',
        body: 'Multi-slide posts designed from your content and published as a swipeable document.',
        today: 'Posts are text, with one optional image.',
      },
      {
        title: 'Video',
        body: 'Video posts.',
        today: 'Not available.',
      },
      {
        title: 'Newsletter generation',
        body: 'Expanding your strongest posts into a LinkedIn newsletter.',
        today: 'Not available.',
      },
    ],
  },
  {
    group: 'Accounts',
    items: [
      {
        title: 'Company pages',
        body: 'Posting to a LinkedIn company page, as an add-on to the Personal plan.',
        today: 'One personal LinkedIn profile per subscription. The add-on cannot be bought yet.',
      },
    ],
  },
  {
    group: 'Voice and intelligence',
    items: [
      {
        title: 'Learning from your past LinkedIn posts',
        body: 'Reading the posts you have already published so your voice settings start from how you write.',
        today: 'Signing in with LinkedIn pre-fills your profile details. Your past posts are not read.',
      },
      {
        title: 'Performance learning',
        body: 'Using which of your published posts get the most response to shape new drafts.',
        today: 'It learns from what you edit and reject.',
      },
      {
        title: 'Analytics dashboard',
        body: 'A view of how your published posts perform.',
        today: 'The product shows your monthly allowance usage. For post numbers, LinkedIn’s own analytics are the place to look.',
      },
      {
        title: 'Smart timing',
        body: 'Choosing posting slots from when your own audience is active.',
        today: 'You set the days and times for each campaign.',
      },
    ],
  },
  {
    group: 'Conversation',
    items: [
      {
        title: 'Comment reply suggestions',
        body: 'Suggested replies to comments on your own posts, for you to send or ignore.',
        today: 'Not available. Tyashin never comments on other people’s posts, and that will not change.',
      },
    ],
  },
];
