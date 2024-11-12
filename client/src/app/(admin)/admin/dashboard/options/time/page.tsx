"use client";

import React, { useEffect, useState } from "react";
import { useUpdateWaitTimeMutation, useGetWaitTimeQuery } from "@/state/api";
import Swal from "sweetalert2";

const TimePage = () => {
  const [tempoEspera, setTempoEspera] = useState(0);
  const [mensagemAtiva, setMensagemAtiva] = useState(false);
  const [updateWaitTime] = useUpdateWaitTimeMutation();
  const { data: timeInfo, refetch } = useGetWaitTimeQuery();

  useEffect(() => {
    setTempoEspera(timeInfo?.waitTime);
    setMensagemAtiva(timeInfo?.messageActivated);
    refetch();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const waitConfiguration = {
      waitTime: Number(tempoEspera),
      messageActivated: mensagemAtiva,
    };

    try {
      await updateWaitTime(waitConfiguration);

      Swal.fire("Sucesso", "Mensagem de espera modificada", "success");
    } catch (error) {
      console.error("Erro ao atualizar o messgem:", error);
      Swal.fire(
        "Erro",
        "Ocorreu um erro ao atualizar o status do messagem.",
        "error"
      );
    }
  };

  const toggleMensagem = () => {
    setMensagemAtiva(!mensagemAtiva);
  };

  return (
    <div className="font-raleway py-10 lg:py-0 max-w-md mx-auto">
      <h1 className="text-2xl font-black text-primary-green mb-6">
        Configuração do Tempo de Espera
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-md"
      >
        <div className="mb-4">
          <label
            htmlFor="tempoEspera"
            className="block text-gray-700 font-semibold mb-2"
          >
            Tempo de espera (em minutos)
          </label>
          <input
            type="number"
            id="tempoEspera"
            value={tempoEspera}
            onChange={(e) => setTempoEspera(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
            placeholder="Insira o tempo de espera"
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`font-semibold ${
              mensagemAtiva ? "text-green-600" : "text-gray-600"
            }`}
          >
            {mensagemAtiva ? "Mensagem ativada" : "Mensagem desativada"}
          </span>
          <button
            type="button"
            onClick={toggleMensagem}
            className={`py-2 px-4 rounded-md font-semibold transition duration-300 ${
              mensagemAtiva
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-primary-green text-white hover:bg-green-700"
            }`}
          >
            {mensagemAtiva ? "Desativar" : "Ativar"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-primary-green text-white py-2 rounded-md font-semibold hover:bg-green-700 transition duration-300"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default TimePage;
