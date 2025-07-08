// app/people/[slug]/page.tsx

import { notFound } from "next/navigation"; // use from 'next/router' in Pages Router
import { sanityFetch } from "@/sanity/lib/live";
import { personSlugs } from "@/sanity/lib/queries/person";
import { Metadata, ResolvingMetadata } from "next";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { personMetaQuery, personQuery } from "@/sanity/lib/queries/person";
import PageBuilder from "@/app/components/PageBuilder";
import Tag from "@/app/components/Tag";
import CoverImage from "@/app/components/CoverImage";

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: personSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { data: person } = await sanityFetch({
    query: personMetaQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(person?.picture);

  return {
    title: person?.title,
    description: person?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PeoplePage(props: Props) {
  const params = await props.params;
  const [{ data: person }] = await Promise.all([
    sanityFetch({ query: personQuery, params }),
  ]);

  if (!person?._id) return notFound();

  return (
    <>
      <div className="relative bg-white">
        <div className="relative">
          <header className="bg-white pt-30 xl:pt-32 rightContainer py-10 lg:py-20 !pb-0">
            <div className="mb-5 lg:mb-12 gap-3 flex flex-wrap">
              <Tag label="Team" link="/team" />
            </div>

            <h1 className="text-h1 mb-5 lg:mb-12">{person.title}</h1>
            <p className="text-copy">{person.excerpt}</p>
          </header>

          <article className="pb-12">
            {person?.picture && person?.picture?.asset && (
              <div className="rightContainer">
                <CoverImage image={person.picture} priority />
              </div>
            )}

            {person.pageBuilder && (
              <PageBuilder page={person} key={person._id} />
            )}
          </article>

          {/* <TabbedContentBlock block={filteredFooter} index={785} /> */}
        </div>
      </div>
    </>
  );
}
