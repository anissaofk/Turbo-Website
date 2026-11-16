"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  IconCalendar,
  IconCar,
  IconHome,
  IconSwap,
  IconUser,
  IconUsers,
  IconWrench,
} from "@/components/icons";
import { AutivaLogo } from "@/components/layout/AutivaLogo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Accueil", icon: IconHome, exact: true },
  { href: "/categories/neuf", label: "Neuves & Offres", icon: IconCar },
  { href: "/categories/usage", label: "Usager", icon: IconCar },
  {
    href: "/categories/location",
    label: "Offres de locations",
    icon: IconCalendar,
  },
  {
    href: "/categories/lease-takeover",
    label: "Reprise de bail",
    icon: IconSwap,
  },
  {
    href: "/categories/location-particulier",
    label: "Location Privée",
    icon: IconUsers,
  },
  {
    href: "/categories/inspection",
    label: "Inspection & Garage",
    icon: IconWrench,
  },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function active(href: string, exact?: boolean) {
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
            const isActive = active(item.href, item.exact);
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
          <button
            type="button"
            aria-label="Profil"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-blue-tint text-blue-deep"
          >
            <IconUser className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="xl:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-6 bg-blue-navy" />
            <span className="mt-1.5 block h-0.5 w-6 bg-blue-navy" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-4 py-4 xl:hidden">
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
