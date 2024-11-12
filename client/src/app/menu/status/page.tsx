"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux";
import LanguageSelectorMenu from "@/components/menu/LanguageSelectorMenu";
import { Order } from "@/state/api";
import useSWR from "swr";
import Splash from "@/components/ui/Splash";

const ordersText: { [key: string]: string } = {
  pt: "Meus pedidos",
  es: "Mis pedidos",
  en: "My orders",
};

const myOrdersText: { [key: string]: string } = {
  pt: "Minhas ordenes",
  es: "Mis ordenes",
  en: "My orders",
};

const fetcher = (url: string | URL | Request) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Error al cargar los pedidos");
    }
    return res.json();
  });

const StatusPage = () => {
  const [sessionId, setSessionId] = useState<string>("");

  const selectedLanguageMenu = useAppSelector(
    (state) => state.global.selectedLanguageMenu
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("sessionId");
      setSessionId(storedUserId ?? "");
    }
  }, []);

  const { data: orders, error } = useSWR(
    sessionId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/order/getorderbysessionid/${sessionId}`
      : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  if (error) return <div>Error al cargar los pedidos</div>;
  if (!orders) return <Splash />;

  const deliveredOrders = Array.isArray(orders)
    ? orders.filter((order: { status: string }) => order.status === "DELIVERED")
    : [];

  const pendingOrders = Array.isArray(orders)
    ? orders.filter(
        (order: { status: string }) =>
          order.status != "DELIVERED" && order.status != "CANCEL"
      )
    : [];

  const pendentesText = {
    pt: "Pendentes",
    es: "Pendientes",
    en: "Pending",
  };

  const noPendingOrdersText = {
    pt: "Não há ordens pendentes",
    es: "No hay órdenes pendientes",
    en: "There are no pending orders",
  };

  const completedText = {
    pt: "Completadas",
    es: "Completadas",
    en: "Completed",
  };

  const noCompletedOrdersText = {
    pt: "Não há ordens completadas",
    es: "No hay órdenes completadas",
    en: "There are no completed orders",
  };

  const clientText = {
    pt: "Cliente",
    es: "Cliente",
    en: "Client",
  };

  const roomNumberText = {
    pt: "Número do quarto:",
    es: "Número de habitación:",
    en: "Room number:",
  };

  const statusText = {
    pt: "Estado:",
    es: "Estado:",
    en: "Status:",
  };

  return (
    <div className="padding-container flex flex-col justify-center items-center font-quicksand lg:w-3/4 w-full mx-auto">
      <h2 className="text-2xl font-quicksand font-bold flex text-primary-green">
        {myOrdersText[selectedLanguageMenu]}
      </h2>
      <div className="w-full mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-start font-bold text-primary-green">
            {ordersText[selectedLanguageMenu]}
          </h3>
          <LanguageSelectorMenu />
        </div>
        <div>
          <h2 className="font-medium border-b-2 border-b-primary-gold my-2">
            {pendentesText[selectedLanguageMenu]}
          </h2>
          {pendingOrders && pendingOrders.length > 0 ? (
            <ul className="grid md:grid-cols-3 justify-between gap-4 lg:grid-cols-3">
              {pendingOrders.map((order: Order) => (
                <li key={order.id} className="border-b py-2">
                  <p>
                    <strong>{clientText[selectedLanguageMenu]}</strong>{" "}
                    {order.clientName}
                  </p>
                  <p>
                    <strong>{roomNumberText[selectedLanguageMenu]}</strong>{" "}
                    {order.roomNumber}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                  <p>
                    <strong>{statusText[selectedLanguageMenu]} </strong>
                    <span
                      className={`font-bold ${
                        order.status === "PENDING" && "text-red-500"
                      } ${order.status === "READY" && "text-primary-green"} ${
                        order.status === "COOKING" && "text-yellow-500"
                      } `}
                    >
                      {order.status}
                    </span>
                  </p>
                  {/* Mostrar los items de la orden */}
                  <ul className="mt-2">
                    <h3 className="font-semibold">Items</h3>
                    {order.orderItems.map((item) => (
                      <li key={item.id} className="text-xs">
                        <p>
                          <span className="font-semibold text-primary-green">
                            {" "}
                            {item.dish.name[selectedLanguageMenu]}
                          </span>
                          : {item.quantity} * R$ {item.dish.price.toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              {noPendingOrdersText[selectedLanguageMenu]}{" "}
            </p>
          )}

          <h2 className="font-medium border-b-2 border-b-primary-gold mt-6">
            {completedText[selectedLanguageMenu]}
          </h2>
          {deliveredOrders && deliveredOrders.length > 0 ? (
            <ul className="grid md:grid-cols-3 lg:grid-cols-3">
              {deliveredOrders.map((order: Order) => (
                <li key={order.id} className="border-b py-2">
                  <p>
                    <strong>{clientText[selectedLanguageMenu]} </strong>{" "}
                    {order.clientName}
                  </p>
                  <p>
                    <strong>{roomNumberText[selectedLanguageMenu]}</strong>{" "}
                    {order.roomNumber}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                  <p>
                    <strong>{statusText[selectedLanguageMenu]}</strong>{" "}
                    <span className="font-bold text-blue-500">
                      {order.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              {noCompletedOrdersText[selectedLanguageMenu]}{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
