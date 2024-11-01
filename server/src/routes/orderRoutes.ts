import { Router } from "express";
import {
  createCart,
  createCartItem,
  createOrder,
  deleteCart,
  deleteCartItem,
  getCartById,
  getCartBySessionId,
  getOrCreateCart,
  getOrdersBySessionId,
  getOrdersByStatusSortedByRoomNumber,
  updateCartItemQuantity,
  updateOrderStatus,
} from "../controllers/orderController";

const router = Router();

router.get("/getcart/:cardId", getCartById);
router.get("/getorcreatecart/:sessionId", getOrCreateCart);
router.get("/getcartbysessionid/:sessionId", getCartBySessionId);
router.post("/createcart", createCart);
router.delete("/deletecart/:cartId", deleteCart);
router.post("/createcartitem/:cartId", createCartItem);
router.delete("/deletecartitem/:cartItemId", deleteCartItem);
router.patch("/updatecartitemquantity/:cartItemId", updateCartItemQuantity);
router.post("/createorder/", createOrder);
router.get("/getorderbystatusroomid/", getOrdersByStatusSortedByRoomNumber);
router.patch("/updateorderstatus/:orderId", updateOrderStatus);
router.get("/getorderbysessionid/:sessionId", getOrdersBySessionId);

export default router;
