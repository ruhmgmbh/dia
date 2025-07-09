import { settingsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

import Navigation from "./Nav";
import { HeaderFields } from "../types/NavigationFields";

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  if (!settings?.header) {
    return null;
  }
  const header = settings.header as HeaderFields;

  return (
    <header className="fixed z-50 h-24 inset-0 flex items-center container">
      <Navigation
        primaryLinks={header.primaryLinks}
        secondaryLinks={header.secondaryLinks}
        socialLinks={header.socialLinks}
      />
    </header>
  );
}
