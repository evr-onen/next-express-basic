import { verifyToken } from "../jwt"
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
dotenv.config({ path: __dirname + "/.env" })

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET_KEY as string, (err, email) => {
    if (err) return res.sendStatus(403)
    req.body.email = email
    next()
  })
}
