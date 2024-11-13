import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import puppeteer from "puppeteer-core";
import { Buffer } from "buffer"; // Ensure this import is present

const prisma = new PrismaClient();

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
    // Convertir HTML a PDF y codificar en base64
    const pdfBase64 = await convertHtmlToPdfBase64(printData);
    const printResult = await sendToPrintNode(pdfBase64);

    res.status(200).json(printResult);
  } catch (error: any) {
    console.error("Error al enviar a PrintNode:", error);
    res.status(500).json({ error: "Error al imprimir" });
  }
};

/* const convertHtmlToPdfBase64 = async (html: string): Promise<string> => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", // Ruta encontrada
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html);

  const pdfUint8Array: Uint8Array = await page.pdf({ format: "A4" });
  const pdfBuffer = Buffer.from(pdfUint8Array);

  await browser.close();

  return pdfBuffer.toString("base64");
}; */

const convertHtmlToPdfBase64 = async (html: string): Promise<string> => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome", // Ruta encontrada
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html);

  const pdfUint8Array: Uint8Array = await page.pdf({ format: "A4" });
  const pdfBuffer = Buffer.from(pdfUint8Array);

  await browser.close();

  return pdfBuffer.toString("base64");
};

const sendToPrintNode = async (pdfBase64: string) => {
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
      title: "Trabajo de impresión PDF",
      contentType: "pdf_base64",
      content: pdfBase64,
      source: "Aplicación Next.js",
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
