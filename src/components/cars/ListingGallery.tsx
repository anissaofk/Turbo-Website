"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { useT } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function ListingGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const t = useT();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const count = Math.max(images.length, 1);
  const current = images[active] ?? images[0];

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setActive((i) => (i + delta + count) % count);
    },
    [count],
  );

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl bg-paper-deep">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block aspect-[16/10] w-full text-left"
          aria-label={t.gallery.open}
        >
          <Image
            src={current}
            alt={alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <span className="absolute top-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white">
            {active + 1}/{count}
          </span>
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-navy shadow-sm">
            {t.gallery.enlarge}
          </span>
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label={t.gallery.prev}
              onClick={() => go(-1)}
              className="absolute top-1/2 left-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-blue-navy shadow"
            >
              <Chevron side="left" />
            </button>
            <button
              type="button"
              aria-label={t.gallery.next}
              onClick={() => go(1)}
              className="absolute top-1/2 right-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-blue-navy shadow"
            >
              <Chevron side="right" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg",
                index === active
                  ? "ring-2 ring-blue ring-offset-1"
                  : "opacity-70",
              )}
              aria-label={`${t.gallery.photo} ${index + 1}`}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}

      {open && (
        <Lightbox
          images={images}
          alt={alt}
          index={active}
          onIndexChange={setActive}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function Lightbox({
  images,
  alt,
  index,
  onIndexChange,
  onClose,
}: {
  images: string[];
  alt: string;
  index: number;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const t = useT();
  const count = images.length;
  const [zoomed, setZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{
    x: number;
    y: number;
    ox: number;
    oy: number;
    moved: boolean;
  } | null>(null);

  const resetView = useEffectEvent(() => {
    setZoomed(false);
    setOffset({ x: 0, y: 0 });
  });

  useEffect(() => {
    resetView();
  }, [index]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
      if (e.key === "ArrowRight") onIndexChange((index + 1) % count);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, index, onClose, onIndexChange]);

  function onPointerDown(e: React.PointerEvent) {
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offset.x,
      oy: offset.y,
      moved: false,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.current.moved = true;
    if (zoomed) {
      setOffset({
        x: drag.current.ox + dx,
        y: drag.current.oy + dy,
      });
    }
  }

  function onPointerUp() {
    const d = drag.current;
    drag.current = null;
    if (!d || d.moved) return;

    if (zoomed) {
      setZoomed(false);
      setOffset({ x: 0, y: 0 });
    } else {
      setZoomed(true);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-black/92"
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.open}
    >
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <p className="text-sm font-medium tabular-nums">
          {index + 1} / {count}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (zoomed) {
                setZoomed(false);
                setOffset({ x: 0, y: 0 });
              } else {
                setZoomed(true);
              }
            }}
            className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold"
          >
            {zoomed ? t.gallery.reduce : t.gallery.zoom}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg leading-none"
            aria-label={t.gallery.close}
          >
            ×
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {count > 1 && !zoomed && (
          <>
            <button
              type="button"
              aria-label={t.gallery.prev}
              className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white"
              onClick={() => onIndexChange((index - 1 + count) % count)}
            >
              <Chevron side="left" />
            </button>
            <button
              type="button"
              aria-label={t.gallery.next}
              className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white"
              onClick={() => onIndexChange((index + 1) % count)}
            >
              <Chevron side="right" />
            </button>
          </>
        )}

        <div
          className={cn(
            "relative h-full w-full max-w-5xl touch-none select-none",
            zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <Image
            src={images[index] ?? images[0]}
            alt={alt}
            fill
            priority
            className="object-contain transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomed ? 2 : 1})`,
            }}
            sizes="100vw"
            draggable={false}
          />
        </div>
      </div>

      <p className="px-4 pb-2 text-center text-xs text-white/60">
        {zoomed ? t.gallery.hintPan : t.gallery.hintZoom}
      </p>

      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto px-4 pb-4">
          {images.map((image, i) => (
            <button
              key={`${image}-lb-${i}`}
              type="button"
              onClick={() => onIndexChange(i)}
              className={cn(
                "relative h-12 w-16 shrink-0 overflow-hidden rounded-md",
                i === index ? "ring-2 ring-white" : "opacity-50",
              )}
              aria-label={`${t.gallery.photo} ${i + 1}`}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Chevron({ side }: { side: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {side === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}
