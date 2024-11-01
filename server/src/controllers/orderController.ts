import { Request, Response } from "express";
import { OrderStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sessionId } = req.body;

  try {
    const newCart = await prisma.cart.create({
      data: {
        sessionId,
      },
    });
    res.status(201).json(newCart);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating cart: ${error.message}` });
  }
};

export const getCartBySessionId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sessionId } = req.params;

  try {
    let selectedCart = await prisma.cart.findFirst({
      where: {
        sessionId,
      },
      include: {
        cartItems: {
          include: {
            dish: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    res.json(selectedCart);
  } catch (error: any) {
    res.status(500).json({
      message: `Error getting category by session id: ${error.message}`,
    });
  }
};

export const getCartById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cardId } = req.params;

  try {
    const selectedCategory = await prisma.cart.findUnique({
      where: {
        id: Number(cardId),
      },
      include: {
        cartItems: {
          include: { dish: true },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    res.json(selectedCategory);
  } catch (error: any) {
    res.status(500).json({
      message: `Error getting category by id: ${error.message}`,
    });
  }
};

export const getOrCreateCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sessionId } = req.params;

  try {
    let selectedCart = await prisma.cart.findFirst({
      where: {
        sessionId,
      },
    });

    if (!selectedCart) {
      selectedCart = await prisma.cart.create({
        data: {
          sessionId,
        },
      });
    }

    res.json(selectedCart);
  } catch (error: any) {
    res.status(500).json({
      message: `Error getting category by session id: ${error.message}`,
    });
  }
};

export const createCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cartId } = req.params;
  const { dishId, quantity } = req.body;

  try {
    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId: Number(cartId),
        quantity,
        dishId,
      },
    });
    res.status(201).json(newCartItem);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating cart item: ${error.message}` });
  }
};

export const deleteCartItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cartItemId } = req.params;

  try {
    const deletedCartItem = await prisma.cartItem.delete({
      where: {
        id: Number(cartItemId),
      },
    });

    res.json(deletedCartItem);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error deleting cart item: ${error.message}` });
  }
};

export const updateCartItemQuantity = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: Number(cartItemId),
      },
      data: {
        quantity,
      },
    });

    res.json(updatedCartItem);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating cart item quantity: ${error.message}` });
  }
};

export const deleteCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cartId } = req.params;

  try {
    const deletedCart = await prisma.cart.delete({
      where: {
        id: Number(cartId),
      },
    });

    res.json(deletedCart);
  } catch (error: any) {
    res.status(500).json({ message: `Error deleting cart: ${error.message}` });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sessionId, total, orderItems, roomNumber, clientName } = req.body;

  console.log;
  try {
    const newOrder = await prisma.order.create({
      data: {
        sessionId,
        total,
        roomNumber,
        clientName,
        status: "PENDING",
        orderItems: {
          create: orderItems.map((item: { quantity: any; dishId: any }) => ({
            quantity: item.quantity,
            dishId: item.dishId,
          })),
        },
      },
    });
    res.status(201).json(newOrder);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating cart: ${error.message}` });
  }
};

export const getOrdersByStatusSortedByRoomNumber = async (
  req: Request,
  res: Response
): Promise<void> => {
  const status = req.query.status as OrderStatus | undefined;
  console.log(status);
  try {
    const ordersByStatus = await prisma.order.findMany({
      where: {
        status: status,
      },
      include: {
        orderItems: {
          include: {
            dish: true,
          },
        },
      },
      orderBy: {
        roomNumber: "asc",
      },
    });
    res.json(ordersByStatus);
  } catch (error: any) {
    console.error(`Error fetching orders: ${error.message}`);
    throw error;
  }
};

export const getOrdersBySessionId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sessionId } = req.params;
  try {
    const ordersBySessionId = await prisma.order.findMany({
      where: {
        sessionId,
      },
      include: {
        orderItems: {
          include: {
            dish: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    res.json(ordersBySessionId);
  } catch (error: any) {
    console.error(`Error fetching orders by id: ${error.message}`);
    throw error;
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrderStatus = await prisma.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status,
      },
    });

    res.json(updatedOrderStatus);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating order status: ${error.message}` });
  }
};
