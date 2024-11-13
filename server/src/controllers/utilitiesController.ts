import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Buffer } from "buffer"; // Ensure this import is present

const prisma = new PrismaClient();

const formatTextForReceipt = (
  text: string,
  maxLineLength: number = 48
): string => {
  return text
    .split("\n")
    .map((line) => {
      if (line.length <= maxLineLength) {
        return line;
      }
      // Divide la línea en partes de maxLineLength caracteres
      const parts = [];
      for (let i = 0; i < line.length; i += maxLineLength) {
        parts.push(line.substring(i, i + maxLineLength));
      }
      return parts.join("\r\n");
    })
    .join("\r\n");
};

export const printInfo = async (req: Request, res: Response): Promise<void> => {
  const { printData } = req.body;

  console.log(printData);

  if (!printData) {
    res
      .status(400)
      .json({ error: "No se proporcionó printData en la solicitud" });
    return;
  }

  try {
    // Formatear el texto para que se ajuste a la longitud máxima de línea
    const formattedPrintData = formatTextForReceipt(printData);

    // Convertir el texto formateado a base64
    const textBase64 = Buffer.from(formattedPrintData, "utf-8").toString(
      "base64"
    );
    const printResult = await sendToPrintNode(textBase64);

    res.status(200).json(printResult);
  } catch (error: any) {
    console.error("Error al enviar a PrintNode:", error);
    res.status(500).json({ error: "Error al imprimir" });
  }
};

const sendToPrintNode = async (textBase64: string) => {
  const printNodeApiKey = process.env.PRINT_KEY; // Reemplaza con tu API Key de PrintNode
  const printNodeUrl = "https://api.printnode.com/printjobs";
  const base64ApiKey = Buffer.from(`${printNodeApiKey}:`).toString("base64");

  const response = await fetch(printNodeUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64ApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      printerId: process.env.PRINTER_ID, // Reemplaza con el ID de tu impresora
      title: "Trabajo de impresión de pedido",
      contentType: "raw_base64", // Cambiado a raw_base64 para texto plano
      content: textBase64,
      source: "Aplicación de impresión",
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Error en la solicitud a PrintNode: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
};
