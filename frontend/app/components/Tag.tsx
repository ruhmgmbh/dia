import Link from "next/link";
import { tagStyle } from "./styles/tag";

export default function Tag({ label, link }: { label: string; link: string }) {
  return (
    <Link href={link} className={tagStyle}>
      {label}
    </Link>
  );
}
