import Link from "next/link";
import { cn } from "@sglara/cn";

type SimpleTeaserProps = {
  label: string;
  link: string;
  external?: boolean;
  className?: string;
};

export default function SimpleTeaser({
  label,
  link,
  external = false,
  className,
}: SimpleTeaserProps) {
  if (!label || !link) return null;

  return (
    <div
      className={cn(
        className,
        `flex flex-col justify-center items-center gap-12 border-2 rounded-2xl relative hover:bg-black hover:text-white transition-all h-52 grow`
      )}
    >
      <Link
        href={link}
        className="absolute inset-0 z-10"
        target={external ? "_blank" : ""}
      ></Link>
      <div className="text-center">→ {label}</div>
    </div>
  );
}
