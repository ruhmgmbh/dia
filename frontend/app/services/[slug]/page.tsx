// app/services/[slug]/page.tsx

import { notFound } from "next/navigation"; // use from 'next/router' in Pages Router
import { sanityFetch } from "@/sanity/lib/live";
import Tag from "@/app/components/Tag";
import PageBuilder from "@/app/components/PageBuilder";
import { Metadata, ResolvingMetadata } from "next";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import {
  serviceMetaQuery,
  serviceQuery,
  serviceSlugs,
} from "@/sanity/lib/queries/service";

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: serviceSlugs,
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
  const { data: service } = await sanityFetch({
    query: serviceMetaQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(service?.coverImage);

  return {
    title: service?.title,
    description: service?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServicePage(props: Props) {
  const params = await props.params;
  const [{ data: service }] = await Promise.all([
    sanityFetch({ query: serviceQuery, params }),
  ]);

  if (!service?._id) {
    return notFound();
  }

  return (
    <>
      <div className="relative bg-white">
        <div className="relative">
          <header className="bg-white pt-30 xl:pt-32 rightContainer py-10 lg:py-20">
            <div className="mb-5 lg:mb-12 gap-3 flex flex-wrap">
              <Tag label="Services" link={`/services`} />
            </div>

            <h1 className="text-h1 mb-5 lg:mb-12">{service.title}</h1>
            <p className="text-copy">{service.excerpt}</p>
          </header>

          {service.pageBuilder && (
            <PageBuilder page={service} key={service._id} />
          )}
        </div>
      </div>
    </>
  );
}
