/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "next-sanity";

import ResolvedLink from "@/app/components/ResolvedLink";
import Image from "next/image";
import { urlForFile, urlForImage } from "@/sanity/lib/utils";
import Video from "./Video";

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children, value }) => (
        // Add an anchor to the h1
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({ children, value }) => {
        // Add an anchor to the h2
        return (
          <h2 className="group relative">
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </h2>
        );
      },
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
    },
    types: {
      media: ({ value }) => {
        const caption = value.caption ? (
          <figcaption className="text-copy-small mt-3 text-black">
            {value.caption}
          </figcaption>
        ) : null;

        if (value.mediaType === "image" && value.image) {
          return (
            <figure className="relative w-full my-4">
              <Image
                src={
                  urlForImage(value.image)
                    ?.fit("crop")
                    .auto("format")
                    .url() as string
                }
                width={800}
                height={800}
                sizes="(max-width: 1200px) 100vw, 50vw"
                objectFit="cover"
                className="h-auto w-full rounded-2xl"
                alt={value.alt || ""}
              />

              {caption}
            </figure>
          );
        }

        if (value.mediaType === "video" && value.video) {
          return (
            <figure>
              <Video media={value.video} className="my-4 rounded-2xl w-full" />

              {caption}
            </figure>
          );
        }

        return null;
      },
    },
  };

  return (
    <div
      className={["prose prose-a:text-brand", className]
        .filter(Boolean)
        .join(" ")}
    >
      <PortableText components={components} value={value} />
    </div>
  );
}
