"use client";

import { useEffect, useState } from "react";
import { useGetCartBySessionIdQuery } from "@/state/api";
import LanguageSelectorMenu from "@/components/menu/LanguageSelectorMenu";
import { useAppSelector } from "@/app/redux";
import { FaPlus, FaMinus, FaClock } from "react-icons/fa6";
import Modal from "@/components/ui/Modal";
import {
  useUpdateCartItemQuantityMutation,
  useDeleteCartItemMutation,
  useDeleteCartMutation,
  useCreateOrderMutation,
} from "@/state/api";
import InputField from "@/components/ui/InputField";
import Swal from "sweetalert2";
import { useGetWaitTimeQuery } from "@/state/api";

import {
  buttonText,
  closeText,
  confirmOrderText,
  emptyCartText,
  finalizeOrderText,
  myCardText,
  nameText,
  productText,
  roomNumberText,
} from "@/constants";

const CartPage = () => {
  const [sessionId, setSessionId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const { data: timeInfo, refetch } = useGetWaitTimeQuery();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("sessionId");
      setSessionId(storedUserId ?? "");
    }

    refetch();
  }, []);

  const { data: cart } = useGetCartBySessionIdQuery({ sessionId });
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [createOrder] = useCreateOrderMutation();
  const [deleteCart] = useDeleteCartMutation();
  const selectedLanguageMenu = useAppSelector(
    (state) => state.global.selectedLanguageMenu
  );

  useEffect(() => {
    if (cart && cart.cartItems) {
      const amount = cart.cartItems.reduce((sum, item) => {
        const itemPrice = item.dish?.price || 0;
        return sum + itemPrice * item.quantity;
      }, 0);
      setTotalAmount(amount); // Actualiza totalAmount
    }
  }, [cart]);

  const handleQuantity = async (
    type: "increase" | "decrease",
    cartItemId: number,
    currentQuantity: number,
    itemDishId: number
  ) => {
    const newQuantity =
      type === "increase" ? currentQuantity + 1 : currentQuantity - 1;
    if (newQuantity === 0) {
      await deleteCartItem({ cartItemId });
      const storedAddedItems = localStorage.getItem("addedItems");
      if (storedAddedItems) {
        const parsedItems = JSON.parse(storedAddedItems);
        delete parsedItems[itemDishId];
        localStorage.setItem("addedItems", JSON.stringify(parsedItems));
      }
    } else {
      await updateCartItemQuantity({ cartItemId, quantity: newQuantity });
    }
  };

  const orderConfirmationText = {
    pt: `¿Está seguro que deseja confirmar o pedido para <strong>${customerName}</strong> no quarto <strong>${roomNumber}</strong>?`,
    es: `¿Está seguro que desea confirmar el pedido para <strong>${customerName}</strong> en el cuarto <strong>${roomNumber}</strong>?`,
    en: `Are you sure you want to confirm the order for <strong>${customerName}</strong> in room <strong>${roomNumber}</strong>?`,
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCustomerName("");
    setRoomNumber("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (customerName && roomNumber && !isNaN(Number(roomNumber))) {
      setIsError(false);
      setIsModalOpen(false);
      setCustomerName("");
      setRoomNumber("");

      // Mostrar la alerta de confirmación
      const result = await Swal.fire({
        title: confirmOrderText[selectedLanguageMenu],
        html: orderConfirmationText[selectedLanguageMenu],
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: buttonText[selectedLanguageMenu].confirm,
        cancelButtonText: buttonText[selectedLanguageMenu].cancel,
      });

      if (result.isConfirmed) {
        setTotalAmount(0);
        try {
          const orderInfo = {
            sessionId,
            total: totalAmount,
            clientName: customerName,
            roomNumber: Number(roomNumber),
            orderItems: cart?.cartItems,
          };

          // Generar el contenido del pedido en texto plano
          const orderText = `
Restaurante Villa Colonial
==========================

Detalhes do Pedido
==================
Cliente: ${customerName}
Número do Quarto: ${roomNumber}
Total: R$ ${totalAmount.toFixed(2)}

Itens do Pedido:
-----------------------------------------
| Qt  | Descricao | Preco Unit. | Total |
-----------------------------------------
${cart?.cartItems
  .map(
    (item) =>
      `| ${item.quantity.toString().padEnd(1)} | ${item.dish.name[
        selectedLanguageMenu
      ].padEnd(4)} | R$ ${item.dish.price.toFixed(2).padStart(2)} | R$ ${(
        item.dish.price * item.quantity
      )
        .toFixed(2)
        .padStart(2)} |`
  )
  .join("\n")}
-----------------------------------------

Obrigado pela sua preferencia!

___________________________
Assinatura do Cliente
`;

          // Construir el objeto para enviar en la solicitud
          const requestBody = {
            printData: orderText,
          };

          // Enviar la solicitud POST desde el cliente
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/utilities/print`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Impresión exitosa:", data);
            })
            .catch((error) => {
              console.error("Error al imprimir:", error);
            });

          await createOrder(orderInfo);
          Swal.fire("Sucesso", "A ordem foi criada com sucesso.", "success");
          deleteCart({ cartId: cart?.id ?? 0 });

          if (typeof window !== "undefined") {
            localStorage.setItem("addedItems", JSON.stringify({}));
            localStorage.setItem("isCartCreated", "false");
          }
        } catch (error) {
          console.error("Erro ao criar a ordem:", error);
          Swal.fire("Erro", "Ocorreu um erro ao criar a ordem.", "error");
        } finally {
          closeModal();
        }
      }
    } else {
      setIsError(true);
    }
  };

  console.log(timeInfo);

  return (
    <div className="padding-container flex flex-col justify-center items-center font-quicksand lg:w-3/4 w-full mx-auto">
      <h2 className="text-2xl font-quicksand font-bold flex text-primary-green">
        {myCardText[selectedLanguageMenu]}
      </h2>
      <div className="w-full mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-start font-bold text-primary-green">
            {productText[selectedLanguageMenu]}
          </h3>
          <LanguageSelectorMenu />
        </div>
        {timeInfo?.messageActivated && (
          <div className="flex items-center bg-yellow-100 text-yellow-800 p-4 rounded-md shadow-md">
            <FaClock className="mr-2 text-xl" />
            <span className="font-semibold">
              Tempo de espera estimado:{" "}
              <span className="font-bold">{timeInfo.waitTime}</span> minutos
            </span>
          </div>
        )}
        {cart?.cartItems && cart.cartItems.length > 0 ? (
          <div className="w-full mt-4 space-y-4">
            {cart.cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <h4 className="">{item.dish.name[selectedLanguageMenu]}</h4>
                  <p className="font-bold">
                    R$ {(item.dish.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="cursor-pointer bg-primary-green h-5 w-5 text-white rounded-full flex justify-center items-center"
                    onClick={() =>
                      handleQuantity(
                        "decrease",
                        item.id,
                        item.quantity,
                        item.dish.id ?? 0
                      )
                    }
                  >
                    <FaMinus />
                  </div>
                  <p className="text-base font-semibold">{item.quantity}</p>
                  <div
                    className="cursor-pointer bg-primary-green h-5 w-5 text-white rounded-full flex justify-center items-center"
                    onClick={() =>
                      handleQuantity(
                        "increase",
                        item.id,
                        item.quantity,
                        item.dish.id ?? 0
                      )
                    }
                  >
                    <FaPlus />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-8">
            {emptyCartText[selectedLanguageMenu]}
          </p>
        )}
      </div>
      <div className="fixed bottom-[6rem] flex justify-between items-center w-full px-6 lg:w-2/4">
        <p className="font-black font-raleway text-3xl text-primary-green">
          R$ {totalAmount?.toFixed(2)}
        </p>
        <button
          onClick={openModal}
          className={`btn bg-primary-green text-gray-100 ${
            cart?.cartItems?.length == 0 && "bg-opacity-80 cursor-not-allowed"
          }`}
          disabled={cart?.cartItems?.length == 0 || totalAmount == 0}
        >
          {finalizeOrderText[selectedLanguageMenu]}
        </button>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={"Finalize seu pedido"}
        >
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 gap-6">
              {isError && (
                <div className="bg-red-700 text-sm text-white font-semi-boldbold text-center py-3">
                  <p>Dados errados. Verifique</p>
                </div>
              )}
              <InputField
                label={nameText[selectedLanguageMenu]}
                name="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <InputField
                label={roomNumberText[selectedLanguageMenu]}
                name="roomNumber"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="py-2 px-4 text-xs hover:bg-opacity-70 text-white bg-red-700 bg-opacity-80"
              >
                {closeText[selectedLanguageMenu]}
              </button>
              <button
                type="submit"
                className="py-2 px-4 text-xs hover:bg-opacity-70 text-white bg-blue-700 bg-opacity-80"
              >
                {confirmOrderText[selectedLanguageMenu]}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CartPage;
