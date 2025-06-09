import Link from "next/link";

import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import {
  Project as ProjectType,
  FeaturedProjectsQueryResult,
} from "@/sanity.types";
import OnBoarding from "@/app/components/Onboarding";
import { createDataAttribute } from "next-sanity";

const Project = ({
  project,
}: {
  project: FeaturedProjectsQueryResult[number];
}) => {
  const { _id, title, slug, excerpt, client, coverImage } = project;

  const attr = createDataAttribute({
    id: _id,
    type: "project",
    path: "title",
  });

  return (
    <article
      data-sanity={attr()}
      key={_id}
      className="flex flex-col justify-between hover:bg-white relative w-full lg:w-1/3 p-2.5 gap-2.5 transition-colors hover:[&_h3]:text-black"
    >
      <Link
        className="hover:text-brand underline transition-colors"
        href={`/projects/${slug}`}
      >
        <span className="absolute inset-0 z-10" />
      </Link>

      <div className="relative aspect-[3/4]">
        <Image
          alt={coverImage?.alt || ""}
          className="object-cover"
          fill
          src={urlForImage(coverImage)?.fit("scale").url() as string}
        />
      </div>

      <div>
        <h3 className="text-h3 text-white hover:text-black transition-colors">
          {title}
        </h3>
      </div>
    </article>
  );
};

const Projects = ({ children }: { children: React.ReactNode }) => (
  <div className="pt-6 flex flex-col lg:flex-row w-full gap-6">{children}</div>
);

export const FeaturedPosts = async () => {
  const { data } = await sanityFetch({ query: featuredProjectsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  return (
    <Projects>
      {data.map((project: any) => (
        <Project key={project._id} project={project} />
      ))}
    </Projects>
  );
};
