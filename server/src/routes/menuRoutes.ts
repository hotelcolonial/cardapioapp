import { Router } from "express";
import {
  deleteCategory,
  deleteDish,
  getCategoryById,
  getDishesByCategoryId,
  updateCategory,
  updateDish,
  getMenuByType,
  createCategory,
  createDish,
} from "./../controllers/menuController";

const router = Router();

router.get("/getmenu/:menuTypeId", getMenuByType);
router.post("/createcategory", createCategory);
router.get("/getdishesbycategory/:categoryId", getDishesByCategoryId);
router.get("/getcategorybyid/:categoryId", getCategoryById);
router.patch("/editcategory/:categoryId", updateCategory);
router.delete("/deletecategory/:categoryId", deleteCategory);
router.post("/createdish", createDish);
router.patch("/editdish/:dishId", updateDish);
router.delete("/deletedish/:dishId", deleteDish);

export default router;
