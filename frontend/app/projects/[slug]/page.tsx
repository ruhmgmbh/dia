// app/projects/[slug]/page.tsx

import {
  projectMetaQuery,
  projectQuery,
} from "../../../sanity/lib/queries/project";
import { notFound } from "next/navigation"; // use from 'next/router' in Pages Router
import { sanityFetch } from "@/sanity/lib/live";
import Tag from "@/app/components/Tag";
import PageBuilder from "@/app/components/PageBuilder";
import { TabbedContentProps } from "@/app/components/TabbedContent/TabbedContent";
import { projectSlugs } from "@/sanity/lib/queries/project";
import { Metadata, ResolvingMetadata } from "next";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: projectSlugs,
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
  const { data: project } = await sanityFetch({
    query: projectMetaQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(project?.coverImage);

  return {
    title: project?.title,
    description: project?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage(props: Props) {
  const params = await props.params;
  const [{ data: project }] = await Promise.all([
    sanityFetch({ query: projectQuery, params }),
  ]);

  if (!project?._id) {
    return notFound();
  }

  // const projectFooter: TabbedContentProps = {
  //   block: {
  //     _type: "tabbedContent",
  //     tabs: [
  //       {
  //         _type: "tab",
  //         title: "Kunde",
  //         contentType: "links",
  //         _key: "clientTab",
  //         links: [
  //           {
  //             _type: "tabLink",
  //             _key: project.client?._id || "clientLink",
  //             label: "mehr",
  //             linkType: "client",
  //             client: {
  //               name: project.client?.name || "",
  //               slug: { current: project.client?.slug || "" },
  //               coverImage: project.client?.coverImage,
  //               excerpt: project.client?.description || "",
  //             },
  //           },
  //         ],
  //       },

  //       {
  //         _type: "tab",
  //         title: "Services",
  //         contentType: "links",
  //         _key: "servicesTab",
  //         links:
  //           project.services?.map((service: any) => ({
  //             _type: "tabLink",
  //             _key: service._id,
  //             label: service.title,
  //             linkType: "service",

  //             service: {
  //               title: service.title,
  //               slug: { current: service.slug },
  //             },
  //           })) || [],
  //       },

  //       {
  //         _type: "tab",
  //         title: "A propos...",
  //         contentType: "links",
  //         _key: "projectsTab",
  //         links:
  //           project.projects?.map((project: any) => ({
  //             _type: "tabLink",
  //             _key: project._id,
  //             label: "mehr",
  //             linkType: "project",

  //             project: {
  //               title: project.title,
  //               excerpt: project.excerpt || "",
  //               slug: { current: project?.slug || "" },
  //               coverImage: project.coverImage,
  //             },
  //           })) || [],
  //       },
  //     ],
  //   },
  // };
  // const filteredFooter = {
  //   tabs: projectFooter.block.tabs!.filter(
  //     (tab) => tab.links && tab.links.length > 0
  //   ),
  // };

  return (
    <>
      <div className="relative bg-white">
        <div className="relative">
          <header className="bg-white pt-30 xl:pt-32 rightContainer py-10 lg:py-20">
            <div className="mb-5 lg:mb-12">
              <h1 className="text-h1 mb-5 lg:mb-12">{project.title}</h1>
              <p className="text-copy">{project.excerpt}</p>
            </div>

            <div className="gap-3 flex flex-wrap">
              {project.services &&
                project.services.map((service: any) => {
                  return (
                    <Tag
                      label={service.title}
                      link={`/services/${service.slug}`}
                      key={service._id}
                    />
                  );
                })}
            </div>
          </header>

          {project.pageBuilder && (
            <PageBuilder page={project} key={project._id} />
          )}

          {/* <TabbedContentBlock block={filteredFooter} index={785} /> */}
        </div>
      </div>
    </>
  );
}
