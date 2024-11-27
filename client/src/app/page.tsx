"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/cardapio"); // Redirige a "/menu" cuando el componente se monta
  }, [router]);

  return null; // Evita renderizar contenido mientras redirige
}
