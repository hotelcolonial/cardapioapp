"use client";

import useSWR from "swr";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Swal from "sweetalert2";
import { useUpdateOrderStatusMutation } from "@/state/api";

// Definir la interfaz para los elementos de pedido
interface OrderItem {
  id: number;
  dish: {
    name: {
      pt: string;
    };
    price: number;
  };
  quantity: number;
}

// Definir la interfaz para los pedidos
interface Order {
  id: number;
  createdAt: string | number | Date;
  roomNumber: number;
  clientName: string;
  total: number;
  status: string;
  orderItems: OrderItem[];
}

// Función para agrupar pedidos por fecha
const groupOrdersByDate = (orders: Order[]) => {
  return orders.reduce((acc: { [date: string]: Order[] }, order: Order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});
};

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Erro ao carregar os pedidos");
    }
    return res.json();
  });

const CancelledOrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<string>("");
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { data: orders, error } = useSWR<Order[]>(
    `${apiUrl}/order/getorderbystatusroomid?status=CANCEL`,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (error) return <div>Erro ao carregar pedidos</div>;
  if (!orders) return <div>Carregando...</div>;

  const ordersGroupedByDate = groupOrdersByDate(orders);

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    try {
      await updateOrderStatus({ orderId: selectedOrder.id, status });
      closeModal();
      Swal.fire("Sucesso", "Status do pedido atualizado.", "success");
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido:", error);
      Swal.fire(
        "Erro",
        "Ocorreu um erro ao atualizar o status do pedido.",
        "error"
      );
    }
  };

  return (
    <div className="font-raleway py-10 lg:py-0">
      <h1 className="text-2xl font-black text-primary-green">
        Pedidos cancelados
      </h1>
      <div className="py-6">
        {Object.keys(ordersGroupedByDate).length === 0 ? (
          <div>Não há pedidos cancelados.</div>
        ) : (
          Object.keys(ordersGroupedByDate).map((date) => (
            <div key={date} className="mb-6">
              <h2 className="text-md font-semibold text-gray-700 font-quicksand">
                {date}
              </h2>
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Número do Quarto</th>
                    <th className="py-2 px-4 border-b">Cliente</th>
                    <th className="py-2 px-4 border-b">Total</th>
                    <th className="py-2 px-4 border-b">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersGroupedByDate[date].map((order) => (
                    <tr key={order.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b text-center">
                        {order.roomNumber}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {order.clientName}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        R${order.total.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          className="px-2 py-1 text-xs font-semibold text-blue-600 hover:underline"
                          onClick={() => openModal(order)}
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedOrder && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Detalhes do Pedido"
        >
          <form
            onSubmit={handleSubmit}
            className="font-quicksand w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
          >
            <p>
              <strong>Cliente:</strong> {selectedOrder.clientName}
            </p>
            <p>
              <strong>Número do Quarto:</strong> {selectedOrder.roomNumber}
            </p>
            <p>
              <strong>Total:</strong> R${selectedOrder.total}
            </p>
            <p>
              <strong>Status Atual:</strong> {selectedOrder.status}
            </p>

            <h3 className="mt-4 text-md font-semibold">Itens do Pedido:</h3>
            <ul className="list-disc pl-5 pb-2">
              {selectedOrder.orderItems.map((item) => (
                <li key={item.id} className="py-1">
                  <span>
                    <strong>{item.dish.name.pt}:</strong> {item.quantity} x R$
                    {item.dish.price}
                  </span>
                </li>
              ))}
            </ul>

            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="py-2 px-4 text-xs hover:bg-opacity-70 text-white bg-red-700 bg-opacity-80"
              >
                Fechar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CancelledOrdersPage;
