import "./globals.css";
import localFont from "next/font/local";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing, toPlainText } from "next-sanity";
import { Toaster } from "sonner";

import DraftModeToast from "@/app/components/DraftModeToast";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { handleError } from "./client-utils";
import { SettingsQueryResult } from "@/sanity.types";
import {
  SceneModelProvider,
  useSceneModels,
} from "./components/3D/SceneModelProvider";
import Scene from "./components/3D/Scene";
import SceneLayer from "./components/3D/SceneLayer";

const defaultTitle = "Ruhm";

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });

  const suffixTitle = settings?.websiteTitle ?? defaultTitle;

  const title = settings?.seo?.title;
  const description = settings?.seo?.description;

  const ogImage = resolveOpenGraphImage(settings?.seo?.image);
  let metadataBase: URL | undefined = undefined;

  return {
    metadataBase,
    title: {
      template: `%s | ${suffixTitle}`,
      default: `${title} | ${suffixTitle}`,
    },
    description: description,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    robots: { index: false },
  } satisfies Metadata;
}

const helveticaNow = localFont({
  src: "../assets/font/HelveticaNow/HelveticaNowText-Medium.woff2",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${helveticaNow.className} bg-white text-black`}>
      <body>
        <section className="min-h-screen">
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
            </>
          )}
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <Header />

          <SceneModelProvider>
            <main className="">{children}</main>
            <SceneLayer />
          </SceneModelProvider>
          <Footer />
        </section>
        <SpeedInsights />
      </body>
    </html>
  );
}
