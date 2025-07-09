"use client";
import { useState, useRef, useLayoutEffect, useEffect } from "react"; // Add useRef and useLayoutEffect
import { cn } from "@sglara/cn";
import Link from "next/link";

import Logo from "@/assets/logo/logo.svg";
import Menu from "@/assets/icons/menu.svg";
import { LinkWithLabel } from "../types/NavigationFields";
import { linkResolver } from "@/sanity/lib/utils";
import { GroqLink } from "./TabbedContent/TeaserContent";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

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
  const navRef = useRef<HTMLElement>(null); // Ref for the nav element
  const pathname = usePathname();

  const linkStyles = `px-3.5 py-2.5 rounded-[3px]`;
  const hoverDefault = `hover:bg-grey`;
  const hoverGrey = `hover:bg-black`;

  useEffect(() => {
    toggleMenu(false);
  }, [pathname]);

  useGSAP(
    () => {
      const navElement = navRef.current;
      if (!navElement) return;

      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "bounce.out" },
      });

      if (menuOpen) {
        // OPENING ANIMATION: Expand Width then Drop Height

        // Temporarily make it visible and allow auto calculation to get target dimensions
        gsap.set(navElement, {
          height: "auto",
          width: "auto",
          opacity: 1,
          pointerEvents: "auto",
          display: "flex", // Ensure it's part of the layout for measurement
          overflow: "hidden", // Keep hidden during initial measurement to prevent flash
        });

        const targetWidth = navElement.offsetWidth;
        const targetHeight = navElement.offsetHeight;

        // Set initial state for animation (collapsed)
        gsap.set(navElement, { width: 0, height: 0 });

        tl.to(navElement, {
          width: targetWidth,
          ease: "power2.out",
          duration: 0.4,
        }).to(navElement, {
          height: targetHeight,
          ease: "power2.out",
          duration: 0.4,
        });
      } else {
        // CLOSING ANIMATION: Shrink Height then Shrink Width

        // Capture current dimensions before starting the close animation
        // This ensures the animation starts from its current expanded size
        const currentWidth = navElement.offsetWidth;
        const currentHeight = navElement.offsetHeight;

        gsap.set(navElement, {
          width: currentWidth,
          height: currentHeight,
          opacity: 1, // Ensure it's visible while closing
          pointerEvents: "auto",
          display: "flex",
          overflow: "hidden", // Keep hidden to prevent content overflow during animation
        });

        tl.to(navElement, {
          height: 0,
          ease: "power2.in",
          duration: 0.4,
        }).to(navElement, {
          width: 0,
          ease: "power2.in",
          duration: 0.4,
          onComplete: () => {
            gsap.set(navElement, {
              opacity: 0,
              pointerEvents: "none",
              display: "none", // Hide it completely after animation
              overflow: "hidden", // Ensure it's hidden
            });
          },
        });
      }
    },
    { scope: navRef, dependencies: [menuOpen] }
  );

  return (
    <div
      className="bg-black text-ruhm-khaki flex flex-col rounded-[5px] mt-6 shadow-nav fixed top-0"
      // Removed onMouseLeave here, as it conflicts with explicit open/close logic
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
      {/* Remove the menuOpen ? "flex" : "hidden" conditional class */}
      <nav ref={navRef} className={`flex-col gap-2.5 overflow-hidden w-0 h-0`}>
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
