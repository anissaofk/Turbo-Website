import {
  SearchPageHeader,
  SearchResults,
  SmartSearchForm,
} from "@/components/search";

export const metadata = {
  title: "Annonces",
  description:
    "Recherche détaillée Autiva — filtres et intention en langage naturel.",
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SearchPageHeader />

      <div className="mt-8 rounded-[1.5rem] bg-blue-soft/60 p-5">
        <SmartSearchForm />
      </div>

      <div className="mt-10">
        <SearchResults />
      </div>
    </div>
  );
}
