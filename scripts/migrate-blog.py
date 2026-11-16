#!/usr/bin/env python3
"""One-shot: build src/data/blog-posts.ts from the old marketing site's
apps/web/app/blog/data.ts.

  python3 scripts/migrate-blog.py /path/to/linkedin-leader/apps/web/app/blog/data.ts

Editorial changes (also listed in docs/CONTENT-SOURCES.md):
  - the tool-comparison post is DROPPED (it named other products);
  - passages naming other products are rewritten without the names;
  - statistics and study citations with no source we could check are rewritten
    as plain advice.
Replacements are keyed on the exact original line so the script fails loudly
if the source changes."""
import re, sys, pathlib

src = pathlib.Path(sys.argv[1]).read_text().split('\n')
out = pathlib.Path(__file__).resolve().parent.parent / 'src/data/blog-posts.ts'

# 1. Drop the comparison post.
start = next(i for i, l in enumerate(src) if "slug: 'ai-linkedin-content-tools-comparison'" in l) - 1
end = next(i for i in range(start + 1, len(src)) if src[i].rstrip() == '  },')
assert src[start].strip() == '{', src[start]
lines = src[:start] + src[end + 1:]

# 2. Line rewrites: (unique fragment of the original line, full replacement).
REWRITES = [
    ("LinkedIn has 1 billion members, but only about 1%",
     "<p>Let's get specific. Most people on LinkedIn read and very few write. That's the opportunity: a founder who posts something original every week is competing with far fewer people than it feels like.</p>"),
    ("report 2-5x more inbound messages",
     "  <li><strong>Inbound leads.</strong> People can't reach out about work they never hear about. Founders who post regularly give prospects a reason and a moment to write.</li>"),
    ("<p>Here's what the data shows:</p>",
     "<p>Here's a rule of thumb, from experience rather than from a study:</p>"),
    ("LinkedIn's algorithm actually throttles your second post",
     "  <li><strong>2+ posts/day:</strong> Diminishing returns. Two posts on the same day compete with each other for the same audience.</li>"),
    ("<h2>Timing: what the 2025 data says</h2>",
     "<h2>Timing: sensible starting points</h2>"),
    ("LinkedIn's algorithm in 2025 works differently",
     "<p>Early replies help, and a post that people respond to keeps turning up in feeds after that. So pick a sensible window and stop chasing a perfect minute.</p>"),
    ("timing accounts for maybe 10-15%",
     "<p>But here's the truth: timing is a small part of how a post does. What the post says is most of it. Don't obsess over posting at exactly 8:17 AM.</p>"),
    ("weekend posts from the ~1% who do post",
     "  <li><strong>Saturday-Sunday:</strong> Most people skip weekends, so there is less competing for attention. Worth testing.</li>"),
    ("gets about 500-1,500 impressions",
     "<p>Now think about what a year of that adds up to. Every post reaches some of your connections and some of theirs. Four posts a week, kept up for a year, is a couple of hundred chances for the right person to see what you do.</p>"),
    ("Even a 0.01% conversion rate",
     "<p>You don't need many of them to act. A handful of well-matched inbound conversations a year can change a small practice, and people who come to you already convinced are far easier to work with than people you chased.</p>"),
    ("A McKinsey survey found that 76%",
     "<p>Top talent researches leadership before accepting offers. Senior candidates look up the people they would report to before they reply to a recruiter. If your profile is empty and your last post was a reshare from 2021, you're losing candidates you never knew you had.</p>"),
    ("<strong>The flood of garbage.</strong>",
     "<p><strong>The flood of garbage.</strong> Since AI chat assistants became mainstream, LinkedIn has been flooded with AI-generated posts that all sound the same. You know the type: \"5 lessons I learned about leadership\" written in that painfully neutral, hedge-everything, use-every-buzzword tone. These posts are technically correct and completely soulless.</p>"),
    ("A study from the University of Zurich",
     "<p><strong>The trust problem.</strong> When readers suspect a post is AI-generated, they disengage, whether or not they are right about it. The perception alone is damaging.</p>"),
    ("<strong>The sameness.</strong>",
     "<p><strong>The sameness.</strong> Most AI tools produce output that sounds like... every other AI tool. There's a recognisable \"AI voice\": polished, slightly formal, relentlessly upbeat, full of phrases like \"it's worth noting\" and \"at the end of the day.\" And recognition is the death of authentic content.</p>"),
    ("<strong>AI as a draft partner, not a ghostwriter.</strong>",
     "<p><strong>AI as a draft partner, not a ghostwriter.</strong> There's a spectrum. On one end: copy-paste from a general chat assistant without editing. On the other: use AI to generate a first draft, then rewrite, reshape, add your voice and examples. The second approach isn't inauthentic. It's just efficient. Professional authors use editors. Executives use speechwriters. This is the same principle.</p>"),
    ("With Tyashin, this happens during onboarding",
     "<p>With Tyashin, this happens during setup: you define your voice, add to your knowledge bank, set your content preferences, and every draft is written from them. With a general-purpose chat assistant you'd need to include this context in every prompt (which is tedious but possible).</p>"),
    ("slap a LinkedIn template on top of GPT output",
     "<p>At the same time, audiences will get better at detecting lazy AI content. The bar for what's \"good enough\" will rise. Tools that just put a LinkedIn template on top of raw model output will stop working.</p>"),
]
for frag, repl in REWRITES:
    hits = [i for i, l in enumerate(lines) if frag in l]
    assert len(hits) == 1, (frag, hits)
    lines[hits[0]] = repl

text = '\n'.join(lines)
text = text.replace("'LinkedIn autopilot content'", "'LinkedIn content system'")
text = text.replace('export interface BlogPost', 'export interface LocalPost').replace('BLOG_POSTS: BlogPost[]', 'LOCAL_POSTS: LocalPost[]')

BANNED = ['Taplio', 'Supergrow', 'Buffer', 'Hootsuite', 'ChatGPT', 'AuthoredUp', 'Kleo', 'Typefully', 'Jasper', 'Copy.ai', 'GPT',
          'ContentIn', 'MagicPost', 'EasyGen', 'McKinsey', 'Zurich']
for b in BANNED:
    assert b.lower() not in text.lower(), b

header = ("/**\n * GENERATED by scripts/migrate-blog.py from the previous marketing site's blog.\n"
          " * Fallback posts: served only while the platform Blog API has no published\n"
          " * posts (src/lib/blog.ts). Write new posts in the platform, not here.\n */\n")
out.write_text(header + text)
print('wrote', out, len(text))
