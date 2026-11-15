import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-3xl font-bold tracking-tight">Turbo</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            Find your next car with sharp filters, clear pricing, and direct
            contact to dealers and private sellers.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/search" className="hover:text-white">
                Browse cars
              </Link>
            </li>
            <li>
              <Link href="/search?fuel=Electric" className="hover:text-white">
                Electric
              </Link>
            </li>
            <li>
              <Link href="/search?bodyType=SUV" className="hover:text-white">
                SUVs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
            Sellers
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/sell" className="hover:text-white">
                Sell your car
              </Link>
            </li>
            <li>
              <a href="mailto:hello@turbo.cars" className="hover:text-white">
                hello@turbo.cars
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-white/45 sm:px-6 lg:px-8">
          <span>© 2026 Turbo</span>
          <span>Inspired by marketplace clarity — built for drivers</span>
        </div>
      </div>
    </footer>
  );
}
