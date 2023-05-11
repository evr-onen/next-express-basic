import express from "express"
import { createCardController } from "../controllers/create"
import { validateCreate } from "../middlewares/createProductValidation"

const router = express.Router()

router.post("/create", validateCreate, createCardController)

export default router
