import { Handlers, PageProps } from "$fresh/server.ts";
import type { Post } from "@/utility/blog.ts";
import { loadPost } from "@/utility/blog.ts";
import { render } from "gfm/mod.ts";

interface Data {
  post: Post;
}

export const handler: Handlers<Data> = {
  async GET(_request, context) {
    const {
      params: { slug },
    } = context;

    const { content, postTitle } = await loadPost(slug);

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
