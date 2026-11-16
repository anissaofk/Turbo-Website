import { HomeListings } from "@/components/search/HomeListings";

const heroImage =
  "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=2000&q=80";

export default function Home() {
  return (
    <>
      <section
        className="hero-autiva relative overflow-hidden"
        style={{ ["--hero-image" as string]: `url(${heroImage})` }}
      >
        <div className="relative mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
            ✨ Propulsé par l&apos;IA
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-3xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Trouvez. Comparez.{" "}
            <span className="text-sky-300">Achetez.</span>
            <br />
            <span className="text-blue">Plus simplement.</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
            Recherchez parmi les annonces Autiva — filtres et résultats juste
            en dessous.
          </p>
        </div>
      </section>

      {/* Barre → filtres → autos */}
      <section className="relative z-10 -mt-4 pt-2">
        <HomeListings />
      </section>
    </>
  );
}
