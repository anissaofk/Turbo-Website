import { cn } from "@/lib/utils";

type AutivaLogoProps = {
  className?: string;
  variant?: "light" | "dark";
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { mark: 30, text: "text-lg" },
  md: { mark: 38, text: "text-xl" },
  lg: { mark: 46, text: "text-2xl" },
};

/**
 * Logo Autiva — « A » stylisé (route / mouvement) + wordmark
 * Aligné sur la maquette : marque bleue nette, typo bold.
 */
export function AutivaLogo({
  className,
  variant = "light",
  showWordmark = true,
  size = "md",
}: AutivaLogoProps) {
  const dim = sizes[size];
  const isDark = variant === "dark";
  const gradId = `autiva-a-${size}-${variant}`;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={dim.mark}
        height={dim.mark}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="8"
            y1="4"
            x2="40"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2F80FF" />
            <stop offset="0.55" stopColor="#0066FF" />
            <stop offset="1" stopColor="#0047AB" />
          </linearGradient>
        </defs>

        {/* Stylized A — peak + legs */}
        <path
          d="M24 6L42 42H34.2L30.6 33.2H17.4L13.8 42H6L24 6Z"
          fill={`url(#${gradId})`}
        />
        {/* Negative cut for clean A counter */}
        <path
          d="M24 16.5 28.4 27.2H19.6L24 16.5Z"
          fill={isDark ? "#0A1F44" : "#FFFFFF"}
        />
        {/* Road / motion slash through the A */}
        <path
          d="M14 29.5H34"
          stroke="#93C5FD"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M16.5 29.5H31.5"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Speed tip (car vibe, subtle) */}
        <path
          d="M34 29.5c2.2 0 3.8-1.1 4.6-2.2"
          stroke="#BFDBFE"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>

      {showWordmark && (
        <span
          className={cn(
            "font-display font-extrabold tracking-[-0.04em]",
            dim.text,
            isDark ? "text-white" : "text-blue-navy",
          )}
        >
          AUTIVA
        </span>
      )}
      <span className="sr-only">Autiva</span>
    </span>
  );
}
