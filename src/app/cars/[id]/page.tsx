import { notFound } from "next/navigation";
import { CarDetailView } from "@/components/cars/CarDetailView";
import { cars, getCarById } from "@/data/cars";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCarById(id);
  if (!car) return { title: "Autiva" };
  return {
    title: `${car.year} ${car.make} ${car.model}`,
    description: car.description,
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = getCarById(id);
  if (!car) notFound();

  return <CarDetailView car={car} />;
}
