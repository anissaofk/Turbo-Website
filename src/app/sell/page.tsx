import { SellForm } from "@/components/sell";

export const metadata = {
  title: "Publier une annonce",
  description: "Publiez sur Autiva — neuf, usagé, location, bail ou garage.",
};

export default function SellPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="animate-rise max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          Vendeurs & loueurs
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Publier une annonce
        </h1>
        <p className="mt-4 text-muted">
          Choisissez la case (neuf, usagé, location, reprise de bail, garage,
          particulier) et ajoutez les infos essentielles.
        </p>
      </div>

      <div className="mt-10">
        <SellForm />
      </div>
    </div>
  );
}
