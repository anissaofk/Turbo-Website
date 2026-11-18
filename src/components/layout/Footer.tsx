"use client";

import Link from "next/link";
import { AutivaLogo } from "@/components/layout/AutivaLogo";
import { categories } from "@/data/categories";
import { useT } from "@/i18n/LanguageProvider";

export function Footer() {
  const t = useT();

  return (
    <footer className="mt-auto border-t border-line bg-blue-navy text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <AutivaLogo variant="dark" size="lg" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            {t.footer.tagline}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
            {t.footer.cases}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link href={cat.href} className="hover:text-white">
                  {t.categories[cat.id]}
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
                {t.footer.search}
              </Link>
            </li>
            <li>
              <Link href="/sell" className="hover:text-white">
                {t.footer.publish}
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
          <span>{t.footer.powered}</span>
        </div>
      </div>
    </footer>
  );
}
