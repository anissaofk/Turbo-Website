import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
        Annonce introuvable
      </h1>
      <p className="mt-3 text-muted">
        Cette page n&apos;existe plus — ou le lien est incorrect.
      </p>
      <Link href="/search" className="btn-primary mt-8">
        Voir les annonces
      </Link>
    </div>
  );
}
