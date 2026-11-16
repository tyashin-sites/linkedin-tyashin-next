import { graphJson, type GraphPage } from '@/lib/knowledge-graph';

/** ONE @graph per page. */
export function JsonLd({ page }: { page?: GraphPage }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graphJson(page) }} />;
}
