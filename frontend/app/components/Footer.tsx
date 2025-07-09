import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import { FooterFields } from "../types/NavigationFields";
import { linkResolver } from "@/sanity/lib/utils";
import { GroqLink } from "./TabbedContent/TeaserContent";

const footerLinks = [
  {
    label: "Kontakt",
    url: "/kontakt",
  },
  {
    label: "Karriere",
    url: "/career",
  },
  {
    label: "Rechtliche Hinweise",
    url: "/legal",
  },
];

const defaultCopyright = "Ruhm GmbH, alle Rechte vorbehalten";

export default async function Footer() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  if (!settings?.footer) {
    return null;
  }
  const footer = settings.footer as FooterFields;

  return (
    <footer className="bg-black">
      <div className="bg-black relative text-white container py-12 flex justify-between flex-col lg:flex-row gap-24">
        <nav className="flex flex-col flex-wrap lg:flex-row gap-3 lg:gap-7">
          {footer.links.map((link, i) => {
            const _link = (link as GroqLink).link;

            if (!_link) return null;

            return (
              <Link href={linkResolver(_link)!} key={i}>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="shrink-0">
          ©{new Date().getFullYear()} {footer.copyrightText ?? defaultCopyright}
        </div>
      </div>
    </footer>
  );
}
