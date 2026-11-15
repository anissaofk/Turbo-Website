import { SellForm } from "@/components/sell";

export const metadata = {
  title: "Sell your car",
  description: "List a car on Turbo — starter form you can connect to your API.",
};

export default function SellPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="animate-rise max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          Sellers
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Sell your car
        </h1>
        <p className="mt-4 text-muted">
          Demo listing form. Replace the client-side success state with a real
          API call when you add a backend.
        </p>
      </div>

      <div className="mt-10">
        <SellForm />
      </div>
    </div>
  );
}
