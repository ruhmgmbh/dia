"use client";
import { Tab, TabbedContent } from "@/sanity.types";
import { useEffect, useState } from "react";
import { cn } from "@sglara/cn";
import MediaTextContent from "./MediaTextContent";
import SimpleTeaser from "./SimpleTeaser";
import { SanityImage } from "@/app/types/SanityImage";

type TabbedContentProps = {
  block: TabbedContent;
  index: number;
};

export type CodeTabbedContentProps = {
  block: CodeTabbedContenBlockProps;
};

export type CodeTabbedContenBlockProps = {
  tabs: Array<CodeTabProps>;
};

type CodeTabProps = {
  contentType: "content" | "links";
  _type: "tab";
  _key: string;
  title: string;
  links?: Array<tabbedLinkReference>;
};

type tabbedLinkReference = {
  _key: string;
  _type: "tabLink";
  externalUrl?: string;
  referenceData: {
    _type: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    coverImage?: SanityImage | null;
  };
  label?: string;
};

const linksWithImageTypes = ["person", "project", "client", "networkPartner"];

export default function TabbedContentBlock({
  block,
}: TabbedContentProps | CodeTabbedContentProps) {
  const [currentTab, setCurrentTab] = useState<Tab>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setCurrentTab(block.tabs![activeIndex]);
  }, [activeIndex, block.tabs]);

  if (!block.tabs || block.tabs.length === 0) return null;

  return (
    <div className="py-6 lg:py-12 rightContainer tabbedContent">
      <nav className="flex flex-row gap-6 mb-12">
        {block.tabs.map((tab, i) => {
          return (
            <button
              key={i}
              className="text-copy font-[600] flex-1 cursor-pointer"
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

      <div className={cn("flex flex-wrap gap-6")}>
        {currentTab && currentTab.contentType == "content" && (
          <MediaTextContent
            index={activeIndex}
            contentType="infoSection"
            content={currentTab.content!}
            mediaType={currentTab.mediaType!}
            media={
              currentTab.mediaType == "image"
                ? currentTab.image
                : currentTab.video
            }
          />
        )}

        {currentTab &&
          currentTab.contentType == "links" &&
          currentTab.links &&
          currentTab.links.length > 0 &&
          currentTab.links.map((link) => {
            let _link = link as tabbedLinkReference;

            let hrefLink =
              _link.externalUrl ??
              "/" +
                _link.referenceData._type +
                "s/" +
                (_link.referenceData.slug.current ?? _link.referenceData.slug);

            if (
              (link.reference || _link.referenceData.coverImage) &&
              linksWithImageTypes.includes(_link.referenceData._type)
            ) {
              return (
                <MediaTextContent
                  index={activeIndex}
                  contentType="custom"
                  key={link._key}
                  content={{
                    title: _link.referenceData.title,
                    desc: _link.referenceData.excerpt,
                    link: hrefLink,
                    linkLabel: _link.label ?? "mehr",
                  }}
                  mediaType="image"
                  media={_link.referenceData.coverImage}
                />
              );
            }

            return (
              <SimpleTeaser
                label={_link.label ?? _link.referenceData.title ?? "mehr"}
                link={hrefLink}
                key={link._key}
                external={_link.externalUrl ? true : false}
                className={cn(
                  currentTab.links?.length === 2
                    ? "w-full sm:w-[calc(50%-24px)]"
                    : "w-full sm:w-[calc(33.333%-24px)]"
                )}
              ></SimpleTeaser>
            );
          })}
      </div>
    </div>
  );
}
