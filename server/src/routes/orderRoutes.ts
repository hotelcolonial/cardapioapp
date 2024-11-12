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
  updateOrderRemainingTime,
  updateOrderStatus,
} from "../controllers/orderController";
import {
  getWaitTime,
  updateWaitTime,
} from "../controllers/reservationController";

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
router.patch("/updateorderremainingtime/:orderId", updateOrderRemainingTime);
router.get("/getorderbysessionid/:sessionId", getOrdersBySessionId);
router.patch("/updatewaittime/", updateWaitTime);
router.get("/getwaittime/", getWaitTime);

export default router;
