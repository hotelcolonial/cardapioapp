import { FiUsers, FiEdit } from "react-icons/fi";
import { MdSettings } from "react-icons/md";

export const adminMenuItems = [
  {
    title: "Gestão do Restaurante",
    links: [
      {
        label: "Cardapio",
        icon: <FiUsers className="h-3 w-3" />, // Ícono para Lista de Clientes
        submenu: [
          { label: "Pratos", href: "/admin/dashboard/menu/dishes" },
          { label: "Bebidas", href: "/admin/dashboard/menu/drinks" },
        ],
      },
      {
        label: "Lista de pedidos",
        icon: <FiEdit className="h-3 w-3" />, // Ícono para Editar Benefício
        submenu: [
          {
            label: "Novos (pendentes)",
            href: "/admin/dashboard/orders/new",
          },
          {
            label: "Em preparação",
            href: "/admin/dashboard/orders/preparation",
          },
          {
            label: "Prontos",
            href: "/admin/dashboard/orders/completed",
          },
          {
            label: "Todos",
            href: "/admin/dashboard/orders/all",
          },

          {
            label: "Cancelados",
            href: "/admin/dashboard/orders/canceled",
          },
        ],
      },
      {
        label: "Opções",
        icon: <MdSettings className="h-3 w-3" />, // Ícono para Editar Benefício
        submenu: [
          {
            label: "Tempo de espera",
            href: "/admin/dashboard/options/time",
          },
        ],
      },
    ],
  },
];

export const addToCartText = {
  pt: "Adicionar",
  es: "Agregar",
  en: "Add",
};

export const addedToCartText = {
  pt: "Adicionado",
  es: "Agregado",
  en: "Added",
};

export const dishesText = {
  pt: "Pratos",
  es: "Platos",
  en: "Dishes",
};

export const drinksText = {
  pt: "Bebidas",
  es: "Bebidas",
  en: "Drinks",
};

export const noDishesText = {
  pt: "Não há pratos disponíveis",
  es: "No hay platos disponibles",
  en: "No dishes available",
};

export const welcomeText = {
  pt: "Prezados Hóspedes, aproveitem sua estadia! Não cobramos taxa de serviço.",
  es: "Estimados Huéspedes, ¡disfruten de su estancia! No cobramos tarifa de servicio.",
  en: "Dear Guests, enjoy your stay! We do not charge a service fee.",
};

export const productText = {
  pt: "Meus productos",
  es: "Mis productos",
  en: "My products",
};

export const myCardText = {
  pt: "Meu carrinho",
  es: "Mi carrito",
  en: "My cart",
};

export const emptyCartText = {
  pt: "Seu carrinho está vazio.",
  es: "Su carrito está vacío.",
  en: "Your cart is empty.",
};

export const finalizeOrderText = {
  pt: "Finalizar pedido",
  es: "Finalizar pedido",
  en: "Finalize order",
};

export const nameText = {
  pt: "Nome",
  es: "Nombre",
  en: "Name",
};

export const roomNumberText = {
  pt: "Número do Quarto",
  es: "Número de la Habitación",
  en: "Room Number",
};

export const closeText = {
  pt: "Fechar",
  es: "Cerrar",
  en: "Close",
};

export const confirmOrderText = {
  pt: "Confirmar pedido",
  es: "Confirmar pedido",
  en: "Confirm order",
};

export const buttonText = {
  pt: {
    confirm: "Sim, confirmar",
    cancel: "Cancelar",
  },
  es: {
    confirm: "Sí, confirmar",
    cancel: "Cancelar",
  },
  en: {
    confirm: "Yes, confirm",
    cancel: "Cancel",
  },
};
