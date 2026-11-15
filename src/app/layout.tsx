import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { Footer, Header } from "@/components/layout";
import "./globals.css";

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Turbo — Buy & sell cars",
    template: "%s · Turbo",
  },
  description:
    "Turbo is a car marketplace starter. Browse listings, filter by what matters, and sell your car.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="atmosphere grain relative flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
