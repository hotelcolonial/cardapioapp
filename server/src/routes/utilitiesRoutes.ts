import { Router } from "express";
import { printInfo } from "../controllers/utilitiesController";

const router = Router();

router.post("/print", printInfo);

export default router;
