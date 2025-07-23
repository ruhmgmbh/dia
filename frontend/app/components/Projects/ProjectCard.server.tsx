import { FeaturedProjectsQueryResult } from "@/sanity.types";
import ProjectCardClient from "./ProjectCard.client";
import { urlForImage } from "@/sanity/lib/utils";

export default function ProjectCardServer({
  project,
}: {
  project: FeaturedProjectsQueryResult[number];
}) {
  const { _id, title, slug, coverImage, threedurl } = project;

  if (!threedurl) return null;

  return (
    <ProjectCardClient
      id={_id}
      title={title}
      slug={slug}
      threedurl={threedurl}
      imageSrc={urlForImage(coverImage)?.fit("crop").auto("format").url() || ""}
      imageAlt={coverImage?.alt || ""}
    />
  );
}
