import { Suspense } from "react";

import ResolvedLink from "@/app/components/ResolvedLink";
import { CallToAction } from "@/sanity.types";

import { tagStyle } from "./styles/tag";
import { cn } from "@sglara/cn";

type CtaProps = {
  block: CallToAction;
  index: number;
};

export default function CTA({ block }: CtaProps) {
  return (
    <div className="py-28 bg-black">
      <div className="rightContainer">
        <div className="rounded-2xl max-w-3xl">
          <div className="flex flex-col gap-6">
            <div className=" flex flex-col gap-3 text-white">
              <h2 className="text-h3 font-bold mb-4">{block.heading}</h2>
              <p className="text-copy">{block.text}</p>
            </div>

            <Suspense fallback={null}>
              <div className="flex items-center mt-4">
                <ResolvedLink
                  link={block.link}
                  className={cn(
                    tagStyle,
                    "text-white hover:bg-white hover:text-black"
                  )}
                >
                  {block.buttonText}
                </ResolvedLink>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
