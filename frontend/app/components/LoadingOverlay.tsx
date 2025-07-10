"use client";
import Logo from "@/assets/logo/logo.svg";
import Slogan from "@/assets/logo/slogan.svg";
import { cn } from "@sglara/cn";

export default function LoadingOverlay() {
  return (
    <>
      <div
        className={cn(
          "bg-ruhm-red w-full h-full fixed inset-0 z-50 flex justify-center items-center transition-opacity"
        )}
      >
        <div className="relative">
          <Slogan className="fill-ruhm-khaki absolute top-1 lg:top-2.5 -translate-x-1/2 -translate-y-1/2 spinSlow size-46 lg:size-64" />
          <Logo className="fill-ruhm-khaki absolute -translate-x-1/2 -translate-y-1/2 size-26 lg:size-38" />
        </div>
      </div>
    </>
  );
}
