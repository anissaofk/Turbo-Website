"use client";

import { HomeHeroSearch } from "@/components/search/HomeHeroSearch";
import { HomeListings } from "@/components/search/HomeListings";
import { useT } from "@/i18n/LanguageProvider";

const heroImage =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=80";

export default function Home() {
  const t = useT();

  return (
    <>
      <section
        className="hero-autiva relative min-h-[78vh] overflow-hidden pb-10 pt-12 sm:min-h-[72vh] sm:pt-16"
        style={{ ["--hero-image" as string]: `url(${heroImage})` }}
      >
        <div className="relative mx-auto max-w-[1400px] px-4 text-center sm:px-6 lg:px-8">
          <p className="animate-rise font-display text-sm font-bold tracking-[0.22em] text-white/90 uppercase">
            Autiva
          </p>
          <h1 className="animate-rise delay-1 mx-auto mt-3 max-w-3xl font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.home.headline}
          </h1>
          <p className="animate-rise delay-2 mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            {t.home.subtitle}
          </p>
        </div>

        <div className="mt-10 sm:mt-12">
          <HomeHeroSearch />
        </div>
      </section>

      <HomeListings />
    </>
  );
}
