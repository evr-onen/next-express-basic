import express from "express"
import { getProductsController } from "../controllers/products"
import { authenticateToken } from "../middlewares/authMiddleware"

const router = express.Router()

router.get("/", getProductsController)

export default router
