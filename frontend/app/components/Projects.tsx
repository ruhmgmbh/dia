import Link from "next/link";

import { urlForImage } from "@/sanity/lib/utils";
import Image from "next/image";

import { sanityFetch } from "@/sanity/lib/live";
import { featuredProjectsQuery } from "@/sanity/lib/queries/project";
import {
  Project as ProjectType,
  FeaturedProjectsQueryResult,
} from "@/sanity.types";
import OnBoarding from "@/app/components/Onboarding";
import { createDataAttribute } from "next-sanity";

import FloatingModel from "./3D/FloatingModel";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import Project3DOverlay from "./3D/FloatingModel";
import ProjectCardServer from "./Projects/ProjectCard.server";

const Project = ({
  project,
}: {
  project: FeaturedProjectsQueryResult[number];
}) => {
  const { _id, title, slug, coverImage, threedurl } = project;

  const attr = createDataAttribute({
    id: _id,
    type: "project",
    path: "title",
  });
  return (
    <ProjectCardServer project={project} />
    // <article
    //   data-sanity={attr()}
    //   key={_id}
    //   className="flex flex-col justify-between bg-white relative w-full lg:w-1/3 p-2.5 gap-2.5 transition-colors hover:[&_h3]:text-black rounded-[5px]"
    // >
    //   {threedurl && <Project3DOverlay modelUrl={threedurl} scale={1.2} />}

    //   <Link
    //     className="hover:text-brand underline transition-colors"
    //     href={`/projects/${slug}`}
    //   >
    //     <span className="absolute inset-0 z-10" />
    //   </Link>

    //   <div className="relative aspect-[4/3]">
    //     <Image
    //       alt={coverImage?.alt || ""}
    //       className="object-cover"
    //       fill
    //       src={
    //         urlForImage(coverImage)?.fit("crop").auto("format").url() as string
    //       }
    //     />
    //   </div>

    //   <div className="py-4">
    //     <h3 className="text-h3 text-black hover:text-black transition-colors">
    //       {title}
    //     </h3>
    //   </div>
    // </article>
  );
};

const Projects = ({ children }: { children: React.ReactNode }) => (
  <div className="py-6 flex flex-col lg:flex-row w-full gap-6">{children}</div>
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
