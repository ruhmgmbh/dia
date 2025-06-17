"use client";
import { Tab, TabbedContent } from "@/sanity.types";
import { useEffect, useState } from "react";
import { cn } from "@sglara/cn";
import Info from "./InfoSection";
import Image from "next/image";
import { urlForFile, urlForImage } from "@/sanity/lib/utils";
import Tag from "./Tag";

type TabbedContentProps = {
  block: TabbedContent;
  index: number;
};

const typesWithImagePreview = ["client", "project"];

export default function TabbedContentBlock({ block }: TabbedContentProps) {
  const [currentTab, setCurrentTab] = useState<Tab>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setCurrentTab(block.tabs![activeIndex]);
  }, [activeIndex, block.tabs]);

  if (!block.tabs || block.tabs.length === 0) return null;

  return (
    <div className="my-20">
      <nav className="flex flex-row gap-6 mb-12">
        {block.tabs.map((tab, i) => {
          return (
            <button
              key={i}
              className="text-copy font-[400] flex-1 cursor-pointer"
              onClick={() => setActiveIndex(i)}
            >
              {tab.title}

              <div
                className={cn(
                  activeIndex == i ? "visible" : "invisible",
                  "h-1 w-full bg-black mt-5"
                )}
              ></div>
            </button>
          );
        })}
      </nav>

      <article className="flex flex-col lg:flex-row gap-12 items-start lg:items-stretch">
        {block.tabs[activeIndex].contentType == "content" && (
          <>
            {currentTab?.image && (
              <div className="relative w-full lg:w-2/4 rounded-2xl overflow-hidden h-64 md:h-[30rem] lg:h-auto">
                <Image
                  alt={""}
                  className="object-cover"
                  fill
                  src={
                    urlForImage(currentTab?.image)
                      ?.fit("crop")
                      .auto("format")
                      .url() as string
                  }
                />
              </div>
            )}

            {currentTab?.mediaType === "video" && currentTab?.video && (
              <div className="relative w-full lg:w-2/4 rounded-2xl overflow-hidden aspect-video bg-black">
                <video
                  playsInline
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover rounded-2xl"
                >
                  <source src={urlForFile(currentTab.video)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {block.tabs[activeIndex].content && (
              <div className="w-full lg:w-2/4 [&>div]:my-0 flex flex-col gap-2 items-start">
                <Info
                  block={block.tabs[activeIndex].content}
                  index={activeIndex}
                />

                {block.tabs[activeIndex].link && (
                  <Tag label="mehr" link={block.tabs[activeIndex].link} />
                )}
              </div>
            )}
          </>
        )}

        {block.tabs[activeIndex].links != undefined &&
          block.tabs[activeIndex].links.length > 0 && (
            <>
              {block.tabs[activeIndex].links.map((l, i) => (
                <div key={i} className="relative aspect-square w-24 h-24">
                  {typesWithImagePreview.includes(l.linkType || "") ? (
                    <Image
                      alt={""}
                      className="object-cover"
                      fill
                      src={
                        urlForImage(currentTab)
                          ?.fit("crop")
                          .auto("format")
                          .url() as string
                      }
                    />
                  ) : (
                    <div className="bg-gray-100 w-full h-full rounded-xl" />
                  )}
                </div>
              ))}
            </>
          )}
      </article>
    </div>
  );
}
