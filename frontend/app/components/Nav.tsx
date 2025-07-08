"use client";
import MenuIcon from "@/assets/icons/MenuIcon";
import { useState } from "react";
import { cn } from "@sglara/cn";
import Link from "next/link";

import Logo from "@/assets/logo/logo.svg";
import Menu from "@/assets/icons/menu.svg";

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
    url: "https://instagram.com/@dia",
  },
  {
    label: "‍💻 Call buchen",
    url: "https://callbuchen",
  },
  {
    label: "📨 hi@dia.at",
    url: "mailto:hi@dia.at",
  },
];

export default function Navigation() {
  const [menuOpen, toggleMenu] = useState(false);

  const linkStyles = `px-3.5 py-2.5 rounded-[3px]`;
  const hoverDefault = `hover:bg-grey`;
  const hoverGrey = `hover:bg-black`;

  return (
    <div
      className="bg-black text-ruhm-khaki flex flex-col rounded-[5px] mt-6 shadow-nav fixed top-0"
      onMouseLeave={() => toggleMenu(false)}
    >
      <div className="flex justify-between p-2.5">
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
          <MenuIcon
            width={24}
            height={24}
            className="fill-ruhm-khaki"
          ></MenuIcon>
        </div>
      </div>

      {/* Nav/Open Menu */}
      <nav className={`${menuOpen ? "flex" : "hidden"} flex-col gap-2.5`}>
        <div className="flex gap-2.5 px-2.5">
          <div className="flex flex-col">
            {mainLinks.map((link, i) => {
              return (
                <Link
                  key={i}
                  href={link.url}
                  className={cn(linkStyles, hoverDefault)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col">
            {socials.map((link, i) => {
              return (
                <Link
                  key={i}
                  href={link.url}
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
          {secondLinks.map((link, i) => {
            return (
              <Link
                key={i}
                href={link.url}
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
