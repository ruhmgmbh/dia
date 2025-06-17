// app/projects/[slug]/page.tsx

import { projectQuery } from "../../../sanity/lib/queries/project";
import { notFound } from "next/navigation"; // use from 'next/router' in Pages Router
import { sanityFetch } from "@/sanity/lib/live";
import Tag from "@/app/components/Tag";
import PageBuilder from "@/app/components/PageBuilder";
import TabbedContentBlock from "@/app/components/TabbedContent";
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

  // ToDo: Also Projects and Services (Rework!)

  const clientContent = {
    _type: "tab",
    _key: "client",
    title: "Kunde",
    contentType: "content",
    mediaType: "image",
    image: project.client?.coverImage,
    content: {
      _type: "infoSection",
      heading: project.client?.name || "",
      content: [
        {
          _type: "block",
          _key: "blockKey",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "keyspan",
              text: project.client?.description || "",
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    },
    link: `/clients/${project.client?.slug}`,
  };

  const tabbedFooter: TabbedContent = {
    _type: "tabbedContent",
    tabs: [clientContent as any],
  };

  return (
    <>
      <div className="relative bg-white">
        <div className="relative rightContainer">
          <header className="py-6 bg-white pt-30 xl:pt-32">
            <div className="mb-5 lg:mb-12">
              {project.services &&
                project.services.map((service: any) => {
                  return (
                    <Tag
                      label={service.name}
                      link={`/services/${service.slug}`}
                      key={service._id}
                    />
                  );
                })}
            </div>

            <h1 className="text-h1 mb-5 lg:mb-12">{project.title}</h1>
            <p className="text-copy">{project.excerpt}</p>
          </header>

          {/* Todo: Add Gallery Block */}

          <PageBuilder page={project} />

          <TabbedContentBlock block={tabbedFooter} index={353} />
        </div>
      </div>
    </>
  );
}
