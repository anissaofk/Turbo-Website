"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrow, IconRobot } from "@/components/icons";
import {
  describeIntent,
  intentToQuery,
  parseSmartIntent,
} from "@/lib/smartSearch";
import { cn } from "@/lib/utils";

export function SmartSearchForm({
  large = false,
  className,
}: {
  large?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const preview = value.trim() ? describeIntent(parseSmartIntent(value)) : [];

  function submit(event: FormEvent) {
    event.preventDefault();
    const intent = parseSmartIntent(value);
    const params = new URLSearchParams(intentToQuery(intent));
    router.push(`/search?${params.toString()}`);
  }

  return (
    <div className={className}>
      <form onSubmit={submit}>
        <div
          className={cn(
            "flex items-center gap-3 rounded-full border border-white/40 bg-white shadow-xl",
            large ? "px-4 py-2.5 sm:px-5" : "px-3 py-2",
          )}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-soft text-blue">
            <IconRobot className="h-5 w-5" />
          </span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ex: Je veux une sportive fiable à moins de 700 $ par mois, sans mise de fonds..."
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted sm:text-base"
          />
          <button
            type="submit"
            aria-label="Chercher"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue text-white transition hover:bg-blue-deep"
          >
            <IconArrow className="h-5 w-5" />
          </button>
        </div>
      </form>

      {preview.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {preview.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-blue-deep shadow"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
