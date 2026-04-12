import { startConsumer } from "@/lib/consumer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Service",
  description: "SFMC Inventory Microservice",
};

// Démarrer le consumer RabbitMQ
startConsumer();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}