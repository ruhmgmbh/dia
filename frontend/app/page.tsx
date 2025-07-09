import { FeaturedPosts } from "./components/Projects";

export default async function Page() {
  return (
    <>
      <div className="relative bg-ruhm-red text-ruhm-khaki">
        <div className="relative">
          <header className="py-6 bg-ruhm-red pt-30 xl:pt-32 container">
            <h1 className="text-h1 mb-5 lg:mb-12">
              Wir sind eine Agentur für interaktive Marken, Plattformen und
              Erlebnisse.
            </h1>
            <p className="text-copy">
              Unsere Website befindet sich aktuell im Aufbau. Kontaktiere uns
              unter{" "}
              <a
                href="mailto:hi@dia.at"
                className="text-ruhm-khaki underline hover:opacity-60 transition-opacity"
              >
                office@ruhm.at
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
