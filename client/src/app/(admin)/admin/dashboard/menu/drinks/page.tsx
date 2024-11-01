"use client";

import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import Swal from "sweetalert2";
import LanguageSelector from "@/components/admin/LanguageSelector";
import Modal from "@/components/ui/Modal";
import InputField from "@/components/ui/InputField";
import { useAppSelector } from "@/app/redux";
import {
  useGetMenuByTypeQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/state/api";
import { Category } from "@/state/api";

const DrinksPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { data: menuByType } = useGetMenuByTypeQuery({ menuTypeId: 1 });
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [categoryData, setCategoryData] = useState<Category>({
    id: 0, // Default value
    name: {
      en: "",
      pt: "",
      es: "",
    },
    picUrl: "",
    menuTypeId: 1,
  });

  const selectedLanguage = useAppSelector(
    (state) => state.global.selectedLanguage
  );

  if (!menuByType || !menuByType.categories) {
    return <div>No categories found.</div>;
  }

  const dishes = menuByType.categories.map((category) => ({
    id: category.id,
    name: category.name,
    picUrl: category.picUrl,
    menuTypeId: category.menuTypeId,
  }));

  const openModal = (category?: Category) => {
    if (category) {
      setIsEditing(true);
      setCategoryData({
        ...category,
      });
    } else {
      setIsEditing(false);
      setCategoryData({
        name: { en: "", pt: "", es: "" },
        picUrl: "",
        menuTypeId: 1,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryData({
      name: { en: "", pt: "", es: "" },
      picUrl: "",
      menuTypeId: 1,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateCategory(categoryData);
      } else {
        await createCategory(categoryData);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving category:", error);
      Swal.fire("Error", "Ocorreu um erro ao salvar a categoria.", "error");
    }
  };

  const handleDelete = async (id: number) => {
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
          await deleteCategory({ categoryId: id });
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
        <h1 className="text-3xl font-black text-primary-green">Bebidas</h1>
        <LanguageSelector />
      </div>
      <div className="flex justify-between items-center pb-8">
        <h1 className="text-md font-bold">Categorias</h1>
        <button
          className="flex items-center py-2 px-4 text-sm hover:bg-opacity-70 text-white bg-primary-green bg-opacity-80"
          onClick={() => openModal()}
        >
          <AiOutlinePlus className="mr-2" />
          Adicionar Categoria
        </button>
      </div>
      <div className="grid xl:w-2/3 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish, index) => (
          <div
            className="flex justify-between items-center border-l-8 rounded-md border-0 border-l-primary-green font-quicksand py-3 px-4"
            key={index}
          >
            <Link href={`/admin/dashboard/menu/drinks/${dish.id}`}>
              <p className="cursor-pointer text-gray-900 text-md font-semibold">
                {dish.name[selectedLanguage]}
              </p>
            </Link>
            <div className="gap-1 relative">
              <div
                className="p-2 cursor-pointer flex justify-center hover:bg-slate-300 rounded-full"
                onClick={() => openModal(dish)}
              >
                <CiEdit />
              </div>
              <div
                onClick={() => handleDelete(dish.id!)}
                className="p-2 cursor-pointer flex justify-center hover:bg-slate-300 rounded-full"
              >
                <MdOutlineDeleteOutline />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isEditing ? "Editar Categoria" : "Adicionar Categoria"}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 gap-6">
              <InputField
                label="Nome em Português"
                name="pt"
                value={categoryData.name.pt}
                onChange={handleChange}
                required
              />
              <InputField
                label="Nome em Inglês"
                name="en"
                value={categoryData.name.en}
                onChange={handleChange}
                required
              />
              <InputField
                label="Nome em Espanhol"
                name="es"
                value={categoryData.name.es}
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
                  : "Adicionar Categoria"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default DrinksPage;
