import express, { Request, Response } from "express"
const router = express.Router()

router.get("/", (req: Request, res: Response) => {
  res.send("bura users api")
  // res.json({ message: "Hello from /users endpoint!" })
})

export default router
