import { type PortableTextBlock } from "next-sanity";

import PortableText from "@/app/components/PortableText";
import { InfoSection } from "@/sanity.types";

type InfoProps = {
  block: InfoSection;
  index: number;
};

export default function Info({ block }: InfoProps) {
  return (
    <div className="py-12 rightContainer">
      <div className="">
        <div className="mt-4">
          {block?.content?.length && (
            <PortableText value={block.content as PortableTextBlock[]} />
          )}
        </div>
      </div>
    </div>
  );
}
