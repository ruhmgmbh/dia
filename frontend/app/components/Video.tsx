import { urlForFile } from "@/sanity/lib/utils";
import { cn } from "@sglara/cn";

export default function Video({
  media,
  className,
}: {
  media: any;
  className?: string;
}) {
  return (
    <div className={cn("relative rounded-2xl overflow-hidden", className)}>
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
    </div>
  );
}
