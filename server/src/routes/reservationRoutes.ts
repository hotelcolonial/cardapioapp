import {
  createReservation,
  getReservationByType,
  updateReservationStatus,
} from "./../controllers/reservationController";
import { Router } from "express";

const router = Router();

router.post("/createreservation", createReservation);
router.get("/getreservationbytype", getReservationByType);
router.patch("/updatereservation/:id", updateReservationStatus);

export default router;
