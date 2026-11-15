"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/search", label: "Browse cars" },
  { href: "/sell", label: "Sell your car" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onDark = pathname === "/";

  return (
    <header
      className={cn(
        "relative z-40 border-b",
        onDark
          ? "border-white/10 bg-ink/40 text-white backdrop-blur-md"
          : "border-line bg-paper/90 text-ink backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Turbo
          </span>
          <span
            className={cn(
              "hidden text-xs font-medium tracking-[0.18em] uppercase sm:inline",
              onDark ? "text-white/65" : "text-muted",
            )}
          >
            Vehicle marketplace
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-opacity hover:opacity-100",
                pathname.startsWith(link.href) ? "opacity-100" : "opacity-70",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/sell" className="btn-primary text-sm">
            List a car
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "border-t px-4 py-4 md:hidden",
            onDark ? "border-white/10 bg-ink" : "border-line bg-paper",
          )}
        >
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
