import {
  createReservation,
  getReservationByType,
  updateReservationLocalizator,
  updateReservationStatus,
} from "./../controllers/reservationController";
import { Router } from "express";

const router = Router();

router.post("/createreservation", createReservation);
router.get("/getreservationbytype", getReservationByType);
router.patch("/updatereservation/:id", updateReservationStatus);
router.patch("/updatereservationlocalizator/:id", updateReservationLocalizator);

export default router;
