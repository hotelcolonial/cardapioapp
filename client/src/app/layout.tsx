import type { Metadata } from "next";
import AdminWrapper from "./AppWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Villa Colonial - Cardápio",
  description:
    "Explore o cardápio digital da Villa Colonial com opções variadas de pratos e bebidas em um ambiente prático e moderno. Descubra nossa seleção com descrições detalhadas e imagens tentadoras, tudo ao seu alcance!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``} translate="no">
        <AdminWrapper>{children}</AdminWrapper>
      </body>
    </html>
  );
}
