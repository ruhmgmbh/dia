import Link from "next/link";

export default function Tag({ label, link }: { label: string; link: string }) {
  return (
    <Link
      href={link}
      className="text-copy-small py-2 px-2.5 lg:py-3.5 lg:px-5 border-2 rounded-full hover:bg-black hover:text-white hover:border-black transition-all"
    >
      {label}
    </Link>
  );
}
