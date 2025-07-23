"use client";

import { useEffect, useRef } from "react";
import { useSceneModels } from "../3D/SceneModelProvider";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  slug: string;
  threedurl?: string;
  imageSrc: string;
  imageAlt: string;
};

export default function ProjectCardClient({
  id,
  title,
  slug,
  threedurl,
  imageSrc,
  imageAlt,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { register } = useSceneModels();

  useEffect(() => {
    console.log(ref.current);
    if (threedurl && ref.current) {
      register(id, threedurl, () => ref.current, { offset: [0.8, -0.5, 0] });
    }
  }, [threedurl, id]);

  return (
    <article
      ref={ref}
      className="relative w-full lg:w-1/3 p-2.5 gap-2.5 flex flex-col justify-between bg-white transition-colors"
    >
      <Link href={`/projects/${slug}`} className="absolute inset-0 z-10" />
      <div className="relative aspect-[4/3]">
        <Image fill src={imageSrc} alt={imageAlt} className="object-cover" />
      </div>
      <div className="py-4 bg-white">
        <h3 className="text-h3 text-black hover:text-black transition-colors">
          {title}
        </h3>
      </div>
    </article>
  );
}
