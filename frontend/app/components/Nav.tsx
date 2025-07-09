"use client";
import MenuIcon from "@/assets/icons/MenuIcon";
import { useState } from "react";
import { cn } from "@sglara/cn";
import Link from "next/link";

import Logo from "@/assets/logo/logo.svg";
import Menu from "@/assets/icons/menu.svg";
import { linkField } from "../types/LinkFields";
import { LinkWithLabel } from "../types/NavigationFields";
import { linkResolver } from "@/sanity/lib/utils";
import { GroqLink } from "./TabbedContent/TeaserContent";

interface link {
  label: string;
  url: string;
}

const mainLinks: link[] = [
  {
    label: "Projekte",
    url: "/projects",
  },
  {
    label: "Über",
    url: "/about",
  },
  {
    label: "News",
    url: "/news",
  },
];
const secondLinks: link[] = [
  {
    label: "Webdesign",
    url: "/webdesign",
  },
  {
    label: "UX/UI Design",
    url: "/uxui",
  },
  {
    label: "Digital Branding",
    url: "/branding",
  },
  {
    label: "Digital Marketing",
    url: "/marketing",
  },
  {
    label: "Web Development",
    url: "/webdev",
  },
];

const socials: link[] = [
  {
    label: "📷 Instagram",
    url: "https://instagram.com/ruhmgmbh",
  },
  {
    label: "‍💻 Call buchen",
    url: "https://meet.brevo.com/ruhm",
  },
  {
    label: "📨 office@ruhm.at",
    url: "mailto:office@ruhm.at",
  },
];

export default function Navigation({
  primaryLinks,
  secondaryLinks,
  socialLinks,
}: {
  primaryLinks: LinkWithLabel[];
  secondaryLinks: LinkWithLabel[];
  socialLinks: LinkWithLabel[];
}) {
  const [menuOpen, toggleMenu] = useState(false);

  const linkStyles = `px-3.5 py-2.5 rounded-[3px]`;
  const hoverDefault = `hover:bg-grey`;
  const hoverGrey = `hover:bg-black`;

  return (
    <div
      className="bg-black text-ruhm-khaki flex flex-col rounded-[5px] mt-6 shadow-nav fixed top-0"
      onMouseLeave={() => toggleMenu(false)}
    >
      <div className="flex justify-between p-2.5 pr-5">
        <Link href="/" className={cn(linkStyles, hoverDefault)}>
          <Logo width={45} height={45} className="fill-ruhm-khaki" />
        </Link>
        <div
          className={cn(
            linkStyles,
            hoverDefault,
            "flex items-center cursor-pointer"
          )}
          onClick={() => toggleMenu(!menuOpen)}
        >
          <Menu width={24} height={24} className="fill-ruhm-khaki"></Menu>
        </div>
      </div>

      {/* Nav/Open Menu */}
      <nav className={`${menuOpen ? "flex" : "hidden"} flex-col gap-2.5`}>
        <div className="flex gap-2.5 px-2.5">
          <div className="flex flex-col">
            {primaryLinks.map((link, i) => {
              const _link = (link as GroqLink).link;
              if (!_link) return null;

              return (
                <Link
                  key={i}
                  href={linkResolver(_link)!}
                  className={cn(linkStyles, hoverDefault)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col">
            {socialLinks.map((link, i) => {
              const _link = (link as GroqLink).link;
              if (!_link) return null;

              return (
                <Link
                  key={i}
                  href={linkResolver(_link)!}
                  target="_blank"
                  className={cn(linkStyles, hoverDefault)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col bg-ruhm-red px-2.5 py-2.5">
          {secondaryLinks.map((link, i) => {
            const _link = (link as GroqLink).link;
            if (!_link) return null;

            return (
              <Link
                key={i}
                href={linkResolver(_link)!}
                className={cn(linkStyles, hoverGrey)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
