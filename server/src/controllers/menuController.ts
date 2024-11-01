import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMenuByType = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { menuTypeId } = req.params;
  try {
    const items = await prisma.menuType.findUnique({
      where: { id: Number(menuTypeId) },
      include: {
        categories: {
          include: { menuType: true, dishes: true },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    res.json(items);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving Menu by Category ${error.message}` });
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, picUrl, menuTypeId } = req.body;

  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        picUrl,
        menuTypeId,
      },
    });

    res.status(201).json(newCategory);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating category: ${error.message}` });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { categoryId } = req.params;
  console.log(categoryId);
  try {
    const selectedCategory = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });

    res.json(selectedCategory);
  } catch (error: any) {
    res.status(500).json({
      message: `Error getting category by id: ${error.message}`,
    });
  }
};

export const getDishesByCategoryId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { categoryId } = req.params;

  try {
    const selectedDishes = await prisma.dish.findMany({
      where: {
        categoryId: Number(categoryId),
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json(selectedDishes);
  } catch (error: any) {
    res.status(500).json({
      message: `Error getting dishes by CategoryId: ${error.message}`,
    });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { categoryId } = req.params;
  const { name, picUrl, menuTypeId } = req.body;

  try {
    const updatedReservation = await prisma.category.update({
      where: {
        id: Number(categoryId),
      },
      data: {
        name,
        picUrl,
        menuTypeId,
      },
    });

    res.json(updatedReservation);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating category: ${error.message}` });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { categoryId } = req.params;

  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: Number(categoryId),
      },
    });

    res.json(deletedCategory);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error deleting category: ${error.message}` });
  }
};

export const createDish = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, price, info, categoryId } = req.body;

  try {
    const newDish = await prisma.dish.create({
      data: {
        name,
        price,
        info,
        categoryId,
      },
    });

    res.status(201).json(newDish);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating category: ${error.message}` });
  }
};

export const updateDish = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { dishId } = req.params;
  const { name, price, info, categoryId } = req.body;

  try {
    const updatedDish = await prisma.dish.update({
      where: {
        id: Number(dishId),
      },
      data: {
        name,
        price,
        info,
        categoryId,
      },
    });

    res.json(updatedDish);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating dish: ${error.message}` });
  }
};

export const deleteDish = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { dishId } = req.params;

  try {
    const deletedDish = await prisma.dish.delete({
      where: {
        id: Number(dishId),
      },
    });

    res.json(deletedDish);
  } catch (error: any) {
    res.status(500).json({ message: `Error deleting dish: ${error.message}` });
  }
};
