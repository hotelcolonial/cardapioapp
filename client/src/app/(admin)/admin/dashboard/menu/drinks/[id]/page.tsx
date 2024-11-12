"use client";

import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import LanguageSelector from "@/components/admin/LanguageSelector";
import Modal from "@/components/ui/Modal";
import InputField from "@/components/ui/InputField";
import Swal from "sweetalert2";
import {
  Dish,
  LanguageType,
  useCreateDishMutation,
  useGetCategoryQuery,
  useGetDishesByCategoryQuery,
  useUpdateDishMutation,
  useDeleteDishMutation,
} from "@/state/api";
import { useAppSelector } from "@/app/redux";

const SelectedDrinkPage = ({ params }: { params: { id: string } }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [createDish, { isLoading }] = useCreateDishMutation();
  const [updateDish] = useUpdateDishMutation();
  const [deleteDish] = useDeleteDishMutation();
  const { data: categorySelected } = useGetCategoryQuery({
    categoryId: Number(params.id),
  });
  const [dishData, setDishData] = useState<Dish>({
    name: {
      en: "",
      pt: "",
      es: "",
    },
    price: 0,
    info: {
      en: "",
      pt: "",
      es: "",
    },
    categoryId: Number(params.id),
  });

  const selectedLanguage = useAppSelector(
    (state) => state.global.selectedLanguage
  );

  const { data: dishesByType } = useGetDishesByCategoryQuery({
    categoryId: Number(params.id),
  });

  if (!dishesByType) {
    return <p>No information</p>;
  }
  const openModal = (dish?: Dish) => {
    console.log(dish);
    if (dish) {
      setIsEditing(true);
      setDishData({
        ...dish,
        price: dish.price,
        categoryId: Number(params.id),
      });
    } else {
      setIsEditing(false);
      setDishData({
        name: { en: "", pt: "", es: "" },
        price: 0,
        info: { en: "", pt: "", es: "" },
        categoryId: Number(params.id),
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDishData({
      name: {
        en: "",
        pt: "",
        es: "",
      },
      price: 0,
      info: {
        en: "",
        pt: "",
        es: "",
      },
      categoryId: Number(params.id),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, dataset } = e.target;
    const idioma = dataset.idioma as LanguageType;

    if (name === "price") {
      const parsedValue = parseFloat(value);
      setDishData((prev) => ({
        ...prev,
        [name]: isNaN(parsedValue) ? 0 : parsedValue, // Asegúrate de que no sea NaN
      }));
    } else if (name === "name" || name === "info") {
      setDishData((prev) => ({
        ...prev,
        [name]: {
          ...prev[name as "name" | "info"],
          [idioma]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateDish(dishData);
      } else {
        await createDish(dishData);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving dish", error);
      Swal.fire("Error", "Ocorreu um erro ao salvar a categoria.", "error");
    }
  };
  const handleDelete = async (id: number, categoryId: number) => {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Não poderá recuperar este registro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDish({
            dishId: id,
            categoryId,
          });
          Swal.fire("Excluído", "O registro foi excluído.", "success");
        } catch (error) {
          console.error("Error deleting category:", error);
          Swal.fire("Erro", "Ocorreu um erro ao excluir a categoria.", "error");
        }
      }
    });
  };

  return (
    <div className="font-raleway py-10 lg:py-0">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-3xl font-black text-primary-green">
          {categorySelected?.name[selectedLanguage]}{" "}
        </h1>
        <LanguageSelector />
      </div>
      <div className="flex justify-between items-center pb-8">
        <h1 className="text-md font-bold">Items</h1>
        <button
          className="flex items-center py-2 px-4 text-sm hover:bg-opacity-70 text-white bg-primary-green bg-opacity-80"
          onClick={() => openModal()}
        >
          <AiOutlinePlus className="mr-2" />
          Adicionar Item
        </button>
      </div>
      <div className="flex">
        <div className="py-10 space-y-3 w-full max-w-2xl">
          {dishesByType.length > 0 ? (
            dishesByType.map((item: Dish, index: number) => (
              <div
                key={index}
                className="flex justify-between items-center w-full gap-4"
              >
                <div className="">
                  <h3 className="font-bold text-lg">
                    {item.name[selectedLanguage]}
                  </h3>
                  <p className="text-sm text-gray-500 font-semibold font-raleway">
                    {item.info[selectedLanguage]}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <p className="text-primary-green font-bold">
                    R$ {item.price.toFixed(2)}
                  </p>
                  <button
                    className="flex items-center py-1 px-4 text-sm hover:bg-opacity-70 text-white bg-blue-700 bg-opacity-80"
                    onClick={() => openModal(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="flex items-center py-1 px-4 text-sm hover:bg-opacity-70 text-white bg-red-700 bg-opacity-80"
                    onClick={() =>
                      handleDelete(item.id ?? 0, item.categoryId ?? 0)
                    }
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Não há pratos disponíveis</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isEditing ? "Editar Item" : "Adicionar Item"}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 gap-6">
              <InputField
                label="Nombre en Portugués"
                name="name"
                data-idioma="pt"
                value={dishData.name.pt}
                onChange={handleChange}
                required
              />
              <InputField
                label="Nombre en Inglés"
                name="name"
                data-idioma="en"
                value={dishData.name.en}
                onChange={handleChange}
                required
              />
              <InputField
                label="Nombre en Español"
                data-idioma="es"
                name="name"
                value={dishData.name.es}
                onChange={handleChange}
                required
              />
              <InputField
                label="Descripción en Portugués"
                name="info"
                data-idioma="pt"
                value={dishData.info.pt}
                onChange={handleChange}
                required
              />
              <InputField
                label="Descripción en Inglés"
                name="info"
                data-idioma="en"
                value={dishData.info.en}
                onChange={handleChange}
                required
              />
              <InputField
                label="Descripción en Español"
                name="info"
                data-idioma="es"
                value={dishData.info.es}
                onChange={handleChange}
                required
              />
              <InputField
                label="Precio"
                name="price"
                value={dishData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="py-2 px-4 text-xs hover:bg-opacity-70 text-white bg-red-700 bg-opacity-80"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="py-2 px-4 text-xs hover:bg-opacity-70 text-white bg-blue-700 bg-opacity-80"
              >
                {isEditing
                  ? "Salvar Alterações"
                  : isLoading
                  ? "carregando..."
                  : "Adicionar Item"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SelectedDrinkPage;
