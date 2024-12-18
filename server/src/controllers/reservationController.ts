import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Resend } from "resend";

const prisma = new PrismaClient();

export const createReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    fullName,
    email,
    adults,
    children0to6,
    children7to11,
    selectedMeals,
    grandTotal,
    localizator,
  } = req.body;

  try {
    const newReservation = await prisma.jantarReservation.create({
      data: {
        fullName,
        email,
        adults: Number(adults),
        children0to6: Number(children0to6),
        children7to11: Number(children7to11),
        selectedMeals: selectedMeals || {}, // Asegúrate de manejar valores predeterminados
        verification: 0,
        grandTotal: Number(grandTotal),
        localizator: localizator || "", // Asegúrate de manejar un valor predeterminado
      },
    });

    res.status(201).json(newReservation);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating reservation: ${error.message}` });
  }
};

export const updateReservationLocalizator = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { localizator } = req.body;

  try {
    const updatedReservation = await prisma.jantarReservation.update({
      where: {
        id: Number(id),
      },
      data: {
        localizator,
      },
    });

    res.json(updatedReservation);
  } catch (error: any) {
    res.status(500).json({
      message: `Error updating reservation localizator: ${error.message}`,
    });
  }
};

export const getReservationByType = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type } = req.query;

  try {
    const selectedReservations = await prisma.jantarReservation.findMany({
      where: {
        selectedMeals: {
          path: [type as string], // Accede a la clave dinámica en el JSON
          gte: 0, // Asegúrate de que existe y no es nulo
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json(selectedReservations);
  } catch (error: any) {
    res.status(500).json({
      message: `Error getting reservations by type: ${error.message}`,
    });
  }
};

export const updateReservationStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { verification } = req.body;

  try {
    const updatedReservationStatus = await prisma.jantarReservation.update({
      where: {
        id: Number(id),
      },
      data: {
        verification,
      },
    });

    res.json(updatedReservationStatus);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating reservation status: ${error.message}` });
  }
};

export const updateWaitTime = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { waitTime, messageActivated } = req.body;

  try {
    const existingConfig = await prisma.timeConfiguration.findFirst();

    let updatedWaitTime;

    if (existingConfig) {
      updatedWaitTime = await prisma.timeConfiguration.update({
        where: {
          id: existingConfig.id,
        },
        data: {
          waitTime,
          messageActivated,
        },
      });
    }
    res.json(updatedWaitTime);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating wait time: ${error.message}` });
  }
};

export const getWaitTime = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const existingConfig = await prisma.timeConfiguration.findFirst();

    res.json(existingConfig);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error getting wait time: ${error.message}` });
  }
};
