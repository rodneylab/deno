import { extract } from "$std/encoding/front_matter.ts";

export interface PostMeta {
  slug: string;
  postTitle: string;
  datePublished: string;
  seoMetaDescription: string;
  featuredImage: string;
}

export async function loadPostMeta(slug: string): Promise<PostMeta | null> {
  let text: string;
  try {
    text = await Deno.readTextFile(`./data/posts/${slug}/index.md`);
  } catch (error: unknown) {
    if (error instanceof Deno.errors.NotFound) {
      return null;
    }
    console.error(`Error loading issue ${slug}: ${error}`);
    throw error;
  }
  const {
    attrs: { postTitle, datePublished, seoMetaDescription, featuredImage },
  } = extract<PostMeta>(text);

  return { slug, postTitle, datePublished, seoMetaDescription, featuredImage };
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export async function posts(): Promise<PostMeta[]> {
  const promises = [];
  for await (const entry of Deno.readDir("./data/posts")) {
    const slug = entry.name;
    promises.push(loadPostMeta(slug));
  }
  const posts = (await Promise.all(promises)).filter(notEmpty);
  return posts.sort(
    (a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished),
  );
}
