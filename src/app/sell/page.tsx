import { SellForm } from "@/components/SellForm";

export const metadata = {
  title: "Sell your car",
  description: "List your car on Turbo with price, mileage, and seller contact details.",
};

export default function SellPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="animate-rise max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          For sellers
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Sell your car on Turbo
        </h1>
        <p className="mt-4 text-muted">
          Add the details buyers filter for — make, price, mileage, fuel — and
          go live on the marketplace.
        </p>
      </div>

      <div className="mt-10">
        <SellForm />
      </div>
    </div>
  );
}
