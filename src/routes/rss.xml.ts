const siteURL = 'http://127.0.0.1:5173';
const siteTitle = 'blog';
const siteDescription = 'blog description';

interface Post {
  metadata: {
    site: string;
    slug: string;
    excerpt: string;
    date: Date;
  };
};

export const GET = async () => {
  const posts = await Promise.all(
    Object.entries(import.meta.glob('./blog/*.md')).map(async ([path, resolver]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { metadata } : Post = await resolver();
      const slug = path.slice(2, -3);
      return { ...metadata, slug };
    })
  )
  .then(posts => {
    return posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  });

  const body = render(posts);
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };

  return {
    body,
    headers,
  };
}

const render = (posts) =>
`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (post) => `<item>
<guid isPermaLink="true">${siteURL}/blog/${post.slug}</guid>
<title>${post.title}</title>
<link>${siteURL}/blog/${post.slug}</link>
<description>${post.excerpt}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`
  )
  .join('')}
</channel>
</rss>
`