import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Avatar from "@/app/components/Avatar";
import CoverImage from "@/app/components/CoverImage";
import { MorePosts } from "@/app/components/Posts";
import { sanityFetch } from "@/sanity/lib/live";
import {
  postMetaQuery,
  postPagesSlugs,
  postQuery,
} from "@/sanity/lib/queries/post";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import PageBuilder from "@/app/components/PageBuilder";
import Link from "next/link";
import Tag from "@/app/components/Tag";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postMetaQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const [{ data: post }] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <>
      <div className="relative bg-white">
        <div className="relative">
          <header className="bg-white pt-30 xl:pt-32 rightContainer py-10 lg:py-20">
            <div className="mb-5 lg:mb-12 gap-3 flex flex-wrap">
              <Tag label="News" link={`/news`} />
            </div>

            <h1 className="text-h1 mb-5 lg:mb-12">{post.title}</h1>

            {post?.author && (
              <Link
                className="max-w-3xl flex gap-4 items-center"
                href={`/people/${post.author.slug.current}`}
              >
                {post.author &&
                  post.author.firstName &&
                  post.author.lastName && (
                    <Avatar person={post.author} date={post.date} />
                  )}
              </Link>
            )}
          </header>

          <article className="grid">
            {post?.coverImage && post?.coverImage?.asset && (
              <div className="rightContainer pt-12">
                <CoverImage image={post.coverImage} priority />
              </div>
            )}

            {post.pageBuilder && <PageBuilder page={post} key={post._id} />}
          </article>
        </div>
      </div>

      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container py-12 lg:py-24 grid gap-12">
          <aside>
            <Suspense>{await MorePosts({ skip: post._id, limit: 2 })}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
