import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from "@/utility/blog.ts";
import { render } from "@deno/gfm";

interface Data {
  content: string;
  postTitle: string;
}
export const handler: Handlers<Data> = {
  async GET(_request, context) {
    const {
      params: { slug },
    } = context;

    const { content, postTitle } = (await loadPost(slug)) ?? {};

    if (typeof content !== "string" || typeof postTitle !== "string") {
      return context.renderNotFound();
    }
    return context.render({ content, postTitle });
  },
};

export default function BlogPostPage(context: PageProps<Data>) {
  const {
    data: { content, postTitle },
  } = context;
  const html = render(content);

  return (
    <main>
      <h1>{postTitle}</h1>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
