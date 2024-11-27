"use client";

import { useGetMenuByTypeQuery } from "@/state/api";
import { useState } from "react";

const MenuPage = () => {
  const [menuTypeId, setMenuTypeId] = useState(2);
  const {
    data: menuByType,
    isLoading,
    isError,
    refetch,
  } = useGetMenuByTypeQuery(
    { menuTypeId },
    {
      refetchOnMountOrArgChange: true, // Refetch al cambiar argumentos
      refetchOnFocus: true, // Refetch al volver al foco
      refetchOnReconnect: true, // Refetch al reconectar
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !menuByType) {
    return <div>Error loading menu. Please try again.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{menuByType.name}</h1>

      {menuByType.categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{category.name.en}</h2>

          <div className="flex flex-wrap gap-4">
            {category.dishes.map((dish) => (
              <div
                key={dish.id}
                className="border p-4 rounded-lg shadow-md w-full md:w-1/3 lg:w-1/4"
              >
                <h3 className="text-lg font-bold mb-2">{dish.name.en}</h3>
                <p className="text-gray-600 text-sm mb-2">{dish.info.en}</p>
                <p className="text-primary-green font-semibold">
                  R$ {dish.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuPage;
