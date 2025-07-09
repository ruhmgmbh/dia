import { projectQuery } from "../../../sanity/lib/queries/project";
import { notFound } from "next/navigation"; // use from 'next/router' in Pages Router
import { sanityFetch } from "@/sanity/lib/live";
import Tag from "@/app/components/Tag";
import PageBuilder from "@/app/components/PageBuilder";
import TabbedContentBlock, {
  CodeTabbedContenBlockProps,
  CodeTabbedContentProps,
  TabbedContentProps,
} from "@/app/components/TabbedContent/TabbedContent";
import { TabbedContent } from "@/sanity.types";
import {
  clientMetaQuery,
  clientQuery,
  clientSlugs,
} from "@/sanity/lib/queries/client";
import { Metadata, ResolvingMetadata } from "next";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: clientSlugs,
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
  const { data: client } = await sanityFetch({
    query: clientMetaQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(client?.coverImage);

  return {
    title: client?.name,
    description: client?.excerpt,
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
  const [{ data: client }] = await Promise.all([
    sanityFetch({ query: clientQuery, params }),
  ]);

  if (!client?._id) {
    return notFound();
  }

  return (
    <>
      <div className="relative bg-white">
        <div className="relative">
          <header className="bg-white pt-30 xl:pt-32 rightContainer py-10 lg:py-20">
            <div className="mb-5 lg:mb-12 gap-3 flex flex-wrap">
              <Tag label="Kunden" link={`/clients`} />
            </div>

            <h1 className="text-h1 mb-5 lg:mb-12">{client.name}</h1>
            <p className="text-copy">{client.excerpt}</p>
          </header>

          {client.pageBuilder && <PageBuilder page={client} key={client._id} />}
        </div>
      </div>
    </>
  );
}
