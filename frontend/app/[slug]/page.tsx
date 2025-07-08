import type { Metadata } from "next";
import Head from "next/head";

import PageBuilderPage from "@/app/components/PageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getPageMeta,
  getPageQuery,
  pagesSlugs,
} from "@/sanity/lib/queries/page";
import { GetPageQueryResult } from "@/sanity.types";
import { PageOnboarding } from "@/app/components/Onboarding";
import { notFound } from "next/navigation";
import PageBuilder from "@/app/components/PageBuilder";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: pagesSlugs,
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getPageMeta,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  const fallbackTitle = page?.seo?.title || page?.heading || "Untitled Page";

  const showIndex = page?.seo?.noIndex === false;

  return {
    title: page?.seo?.title || page?.heading,
    description: page?.seo?.description || page?.lead || fallbackTitle,
    keywords: page?.seo?.keywords,
    robots: {
      index: showIndex,
      follow: showIndex,
      nocache: false,
      googleBot: {
        index: showIndex,
        follow: showIndex,
      },
    },
    openGraph: {
      title: page?.seo?.title || page?.heading || fallbackTitle,
      description: page?.seo?.description || page?.lead || "",
      images: page?.seo?.image?.asset?.url
        ? [{ url: page.seo.image.asset.url }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: page?.seo?.title || fallbackTitle,
      description: page?.seo?.description || "",
      images: page?.seo?.image?.asset?.url ? [page.seo.image.asset.url] : [],
    },
  } satisfies Metadata;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const [{ data: page }] = await Promise.all([
    sanityFetch({ query: getPageQuery, params }),
  ]);

  if (!page?._id) {
    return notFound();
  }

  return (
    <>
      <div className="relative bg-white">
        <div className="relative">
          <header className="bg-white pt-30 xl:pt-32 rightContainer py-10 lg:py-20">
            <h1 className="text-h1 mb-5 lg:mb-12">{page.heading}</h1>
            <p className="text-copy">{page.lead}</p>
          </header>

          {page.pageBuilder && <PageBuilder page={page} />}
        </div>
      </div>
    </>
  );
}
