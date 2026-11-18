"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  IconCalendar,
  IconCar,
  IconHome,
  IconSwap,
  IconTag,
  IconUser,
  IconUsers,
  IconWrench,
} from "@/components/icons";
import { AutivaLogo } from "@/components/layout/AutivaLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useT } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const activeCategory = searchParams.get("category");
  const t = useT();

  const nav = [
    { href: "/", label: t.nav.home, icon: IconHome, exact: true },
    {
      href: "/search?category=buy",
      label: t.nav.buy,
      icon: IconCar,
      category: "buy",
    },
    { href: "/sell", label: t.nav.sell, icon: IconTag },
    {
      href: "/categories/location",
      label: t.nav.rentals,
      icon: IconCalendar,
    },
    {
      href: "/categories/lease-takeover",
      label: t.nav.leaseTakeover,
      icon: IconSwap,
    },
    {
      href: "/categories/location-particulier",
      label: t.nav.privateRental,
      icon: IconUsers,
    },
    {
      href: "/categories/inspection",
      label: t.nav.inspection,
      icon: IconWrench,
    },
  ];

  function active(href: string, exact?: boolean, category?: string) {
    if (category === "buy") {
      return (
        pathname.startsWith("/search") &&
        (activeCategory === "buy" ||
          activeCategory === "neuf" ||
          activeCategory === "usage")
      );
    }
    if (category) {
      return pathname.startsWith("/search") && activeCategory === category;
    }
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <AutivaLogo size="md" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = active(
              item.href,
              item.exact,
              "category" in item ? item.category : undefined,
            );
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium transition",
                  isActive
                    ? "bg-blue-soft text-blue-deep"
                    : "text-ink-soft hover:bg-blue-tint hover:text-blue-deep",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label={t.nav.profile}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-blue-tint text-blue-deep"
          >
            <IconUser className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="xl:hidden"
            aria-expanded={open}
            aria-label={t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-blue-navy" />
            <span className="mt-1.5 block h-0.5 w-6 bg-blue-navy" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-4 py-4 xl:hidden">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-xs font-semibold tracking-wide text-muted uppercase">
              {t.nav.language}
            </span>
            <LanguageSwitcher />
          </div>
          <div className="flex flex-col gap-1">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-blue-soft"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4 text-blue" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
