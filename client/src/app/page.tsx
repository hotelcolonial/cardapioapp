"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/menu"); // Redirige a "/menu" cuando el componente se monta
  }, []);

  return null; // Evita renderizar contenido mientras redirige
}
