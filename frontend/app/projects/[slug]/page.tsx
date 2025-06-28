// app/projects/[slug]/page.tsx

import { projectQuery } from "../../../sanity/lib/queries/project";
import { notFound } from "next/navigation"; // use from 'next/router' in Pages Router
import { sanityFetch } from "@/sanity/lib/live";
import Tag from "@/app/components/Tag";
import PageBuilder from "@/app/components/PageBuilder";
import TabbedContentBlock, {
  CodeTabbedContenBlockProps,
  CodeTabbedContentProps,
} from "@/app/components/TabbedContent/TabbedContent";
import { TabbedContent } from "@/sanity.types";

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

  const projectFooter: CodeTabbedContenBlockProps = {
    tabs: [
      {
        _type: "tab",
        title: "Kunde",
        contentType: "links",
        _key: "clientTab",
        links: [
          {
            _type: "tabLink",
            _key: project.client?._id || "clientLink",
            label: "mehr",
            referenceData: {
              _type: "client",
              title: project.client?.name || "",
              slug: { current: project.client?.slug || "" },
              coverImage: project.client?.coverImage,
              excerpt: project.client?.description || "",
            },
          },
        ],
      },

      {
        _type: "tab",
        title: "Services",
        contentType: "links",
        _key: "servicesTab",
        links:
          project.services?.map((service: any) => ({
            _type: "tabLink",
            _key: service._id,
            label: service.title,
            referenceData: {
              _type: "service",
              title: service.title,
              slug: { current: service.slug },
            },
          })) || [],
      },

      {
        _type: "tab",
        title: "A propos...",
        contentType: "links",
        _key: "projectsTab",
        links:
          project.projects?.map((project: any) => ({
            _type: "tabLink",
            _key: project._id,
            label: "mehr",
            referenceData: {
              _type: "project",
              title: project.title || "",
              slug: { current: project?.slug || "" },
              coverImage: project.coverImage,
              excerpt: project.excerpt || "",
            },
          })) || [],
      },
    ],
  };
  const filteredFooter = {
    tabs: projectFooter.tabs.filter((tab) => tab.links && tab.links.length > 0),
  };

  return (
    <>
      <div className="relative bg-white">
        <div className="relative">
          <header className="bg-white pt-30 xl:pt-32 rightContainer py-10 lg:py-20">
            <div className="mb-5 lg:mb-12 gap-3 flex flex-wrap">
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

            <h1 className="text-h1 mb-5 lg:mb-12">{project.title}</h1>
            <p className="text-copy">{project.excerpt}</p>
          </header>

          <PageBuilder page={project} key={project._id} />

          <TabbedContentBlock block={filteredFooter} index={353} />
        </div>
      </div>
    </>
  );
}
