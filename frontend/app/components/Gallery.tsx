"use client";
import { Gallery } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";
import { cn } from "@sglara/cn";
import Image from "next/image";
import { useEffect, useState } from "react";
import Video from "./Video";
import { tagStyle } from "./styles/tag";
import MediaRenderer from "./MediaRenderer";

type GalleryProps = {
  block: Gallery & blockProps;
};

type blockProps = {
  projectTitle?: string;
};

export default function GalleryBlock({ block }: GalleryProps) {
  const [previewMedia, setPreviewMedia] = useState(block.media?.slice(0, 6));
  const [fullMedia, setFullMedia] = useState(block.media);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    toggleDOMScroll();
  }, [showGallery]);

  const toggleDOMScroll = () => {
    if (showGallery) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const previewHeights = `h-40 sm:h-64 lg:h-96`;

  return (
    <>
      <div className="container lg:grid-cols-3 grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 py-6 lg:py-12">
        {previewMedia &&
          previewMedia.length > 0 &&
          previewMedia.map((media, i) => {
            return (
              <div
                className={cn(
                  "relative rounded-2xl overflow-hidden",
                  previewHeights
                )}
                key={media._key}
              >
                {fullMedia &&
                  fullMedia.length > 6 &&
                  previewMedia.length == i + 1 && (
                    <button
                      className="z-20 cursor-pointer absolute inset-0 bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center"
                      onClick={() => setShowGallery(true)}
                    >
                      <span className="absolute p-3 lg:p-6 right-0 bottom-0 text-white !text-4xl lg:!text-6xl">
                        6+
                      </span>
                    </button>
                  )}

                {media.mediaType && (
                  <MediaRenderer
                    type={media.mediaType}
                    media={
                      media.mediaType == "video" ? media.video : media.image
                    }
                    alt={media.caption}
                    className={previewHeights}
                    imgSizes="(max-width: 1024px)50vw, 33vw"
                  />
                )}
              </div>
            );
          })}
      </div>

      {fullMedia && fullMedia.length > 6 && showGallery && (
        <div className="bg-black text-white z-50 fixed top-0 left-0 w-full h-full overflow-auto">
          <div className="container mt-0 pt-0">
            <header className="flex justify-between items-center sticky top-0 z-50 bg-black py-8 gap-12">
              <h3 className="text-h3 truncate max-w-full pb-2">
                {block.projectTitle}
              </h3>
              <button
                className={cn(
                  tagStyle,
                  "hover:bg-white hover:text-black whitespace-nowrap shrink-0"
                )}
                onClick={() => setShowGallery(false)}
              >
                Galerie schließen
              </button>
            </header>

            <div>
              {fullMedia.map((media, i) => {
                if (!media || !media.mediaType) {
                  return null;
                }

                return (
                  <figure key={media._key} className="pb-12 lg:pb-16">
                    <MediaRenderer
                      type={media.mediaType}
                      media={
                        media.mediaType == "video" ? media.video : media.image
                      }
                      alt={media.caption}
                      imgSizes="100vw"
                      className="w-full h-[40vh] sm:h-[60vh] lg:h-[100vh]"
                    />
                    <figcaption className="mt-3 lg:mt-6 text-copy">
                      <span className="font-bold">
                        {`${i + 1}/${fullMedia.length}`}{" "}
                      </span>
                      {media.caption}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
