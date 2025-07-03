"use client";
import { Link, Tab, TabbedContent, TabLink } from "@/sanity.types";
import { useEffect, useState } from "react";
import { cn } from "@sglara/cn";
import MediaTextContent from "./MediaTextContent";
import SimpleTeaser from "./SimpleTeaser";
import { linkField } from "@/app/types/LinkFields";
import TeaserContent from "./TeaserContent";

export type TabbedContentProps = {
  block: TabbedContent;
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
  links?: Array<Link & linkField>;
};

const linksWithImageTypes = ["person", "project", "client", "networkPartner"];

export default function TabbedContentBlock({ block }: TabbedContentProps) {
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
          currentTab.links.map((link) => (
            <TeaserContent
              link={link}
              key={link._key}
              numberOfLinks={currentTab.links!.length}
            />
          ))}
      </div>
    </div>
  );
}
