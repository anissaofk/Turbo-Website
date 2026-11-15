import Link from "next/link";
import { CarCard } from "@/components/cars";
import { SearchForm } from "@/components/search";
import { getFeaturedCars } from "@/data/cars";

const heroImage =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=80";

export default function Home() {
  const featured = getFeaturedCars().slice(0, 4);

  return (
    <>
      <section
        className="hero-plane relative min-h-[92vh] overflow-hidden"
        style={{ ["--hero-image" as string]: `url(${heroImage})` }}
      >
        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20">
          <p className="animate-rise font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Turbo
          </p>
          <h1 className="animate-rise delay-1 mt-4 max-w-3xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your next car starts here.
          </h1>
          <p className="animate-rise delay-2 mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Browse local listings, filter by budget and fuel, or put your own
            car up for sale in a few steps.
          </p>
          <div className="animate-rise delay-3 mt-8 flex flex-wrap gap-3">
            <Link href="/search" className="btn-primary">
              Browse cars
            </Link>
            <Link href="/sell" className="btn-ghost">
              Sell your car
            </Link>
          </div>

          <div className="animate-rise delay-3 mt-10 border border-white/15 bg-ink/55 p-4 backdrop-blur-md sm:p-5">
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Featured cars
            </h2>
            <p className="mt-2 max-w-lg text-muted">
              Sample listings from the seed data — swap them for your own API or
              CMS later.
            </p>
          </div>
          <Link
            href="/search"
            className="text-sm font-semibold text-accent hover:text-accent-deep"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              title: "Search",
              copy: "Make, price, fuel, city — start from what buyers actually care about.",
            },
            {
              title: "Compare",
              copy: "Open a listing for photos, specs, and a direct line to the seller.",
            },
            {
              title: "Sell",
              copy: "Use the sell form as a starting point for your own listing flow.",
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className={
                index === 0
                  ? "animate-rise"
                  : index === 1
                    ? "animate-rise delay-1"
                    : "animate-rise delay-2"
              }
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
