import { Handlers } from "$fresh/server.ts";
import { getDomainUrl } from "@/utility/net.ts";
import website from "@/configuration/website.ts";
import { posts } from "@/utility/blog.ts";

function escapeCdata(value: string) {
  return value.replace(/\]\]>/g, "]]]]><![CDATA[>");
}

function escapeHtml(html: string) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const handler: Handlers = {
  async GET(request) {
    const domainUrl = getDomainUrl(request);

    const { author, rssSiteLanguage, siteTitle } = website;

    const allPosts = await posts();

    const rssString = `
    <rss xmlns:blogChannel="${domainUrl}" version="2.0">
    <channel>
      <title>${siteTitle}</title>
      <link>${domainUrl}</link>
      <description>${siteTitle}</description>
      <language>${rssSiteLanguage}</language>
      <ttl>40</ttl>
      ${
      allPosts
        .map(({ slug, datePublished, seoMetaDescription, postTitle }) =>
          `
          <item>
            <title><![CDATA[${escapeCdata(postTitle)}]]></title>
            <description><![CDATA[${
            escapeHtml(
              seoMetaDescription,
            )
          }]]></description>
            <author><![CDATA[${escapeCdata(author)}]]></author>
            <pubDate>${datePublished}</pubDate>
            <link>${domainUrl}/${slug}</link>
            <guid>${domainUrl}/${slug}</guid>
          </item>
        `.trim()
        )
        .join("\n")
    }
    </channel>
    </rss>`.trim();

    const headers = new Headers({
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
      "Content-Type": "application/xml",
    });

    return new Response(rssString, { headers });
  },
};
