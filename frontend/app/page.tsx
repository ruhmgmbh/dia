import { settingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { Metadata } from "next";
import { FeaturedPosts } from "./components/Projects";

export const metadata: Metadata = {
  title: "Dia - Agentur für interaktive Marken, Plattformen und Erlebnisse.",
  description: "...",
};

export default async function Page() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <>
      <div className="relative bg-dia-yellow">
        <div className="relative container">

          <header className="py-6 bg-dia-yellow pt-30 xl:pt-32">
            <h1 className="text-h1 mb-5 lg:mb-12">
              Wir sind eine Agentur für interaktive Marken, Plattformen und
              Erlebnisse.
            </h1>
            <p className="text-copy">
              Unsere Website befindet sich aktuell im Aufbau. Kontaktiere uns
              unter{" "}
              <a href="mailto:hi@dia.at" className="text-white">
                hi@dia.at
              </a>
            </p>
          </header>
          <main className="bg-black">
            <div className="container">
              <FeaturedPosts />
            </div>
          </main>
      </div>
      </div>
    </>
  );
}
