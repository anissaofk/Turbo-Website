import Link from "next/link";
import { AutivaLogo } from "@/components/layout/AutivaLogo";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-blue-navy text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <AutivaLogo variant="dark" size="lg" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            Votre assistant automobile intelligent pour trouver, comparer et
            acheter — plus simplement.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
            Cases
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={cat.href} className="hover:text-white">
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
            Autiva
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/search" className="hover:text-white">
                Recherche
              </Link>
            </li>
            <li>
              <Link href="/sell" className="hover:text-white">
                Publier une annonce
              </Link>
            </li>
            <li>
              <a href="mailto:hello@autiva.ca" className="hover:text-white">
                hello@autiva.ca
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 text-xs text-white/45 sm:px-6 lg:px-8">
          <span>© 2026 Autiva</span>
          <span>Propulsé par l&apos;IA</span>
        </div>
      </div>
    </footer>
  );
}
