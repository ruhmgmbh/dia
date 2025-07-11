import { urlForFile, urlForImage } from "@/sanity/lib/utils";
import { cn } from "@sglara/cn";
import Image from "next/image";

export default function MediaRenderer({
  type,
  media,
  alt,
  imgSizes,
  priority = false,
  mediaContain = false,
  containBg,
  className,
}: {
  type: "image" | "video";
  media: any;
  alt?: string;
  imgSizes?: string;
  priority?: boolean;
  mediaContain?: boolean;
  containBg?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        `bg-${containBg}`,
        className
      )}
    >
      {type == "video" && (
        <video
          playsInline
          preload="metadata"
          className="!object-cover w-full h-full"
          autoPlay
          muted
          loop
        >
          <source src={urlForFile(media)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {type == "image" && (
        <Image
          alt={alt ?? media.caption ?? ""}
          className={mediaContain ? "object-contain p-10" : "object-cover"}
          fill
          sizes={imgSizes || "50vw"}
          priority={priority}
          src={urlForImage(media)?.fit("crop").auto("format").url() as string}
        />
      )}
    </div>
  );
}
