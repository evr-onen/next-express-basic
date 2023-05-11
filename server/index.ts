import express, { Request, Response, Express } from "express"
import next from "next"
import dotenv from "dotenv"
dotenv.config({ path: __dirname + "/.env" })

import userRouter from "./routes/users"
import productsRouter from "./routes/products"
import cardsRouter from "./routes/cards"
const port = process.env.PORT || 3000
import fileUpload from "express-fileupload"
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server: Express = express()
    // Custom Express.js Middleware
    server.use(express.json()) // JSON request body parsing
    server.use(fileUpload())

    server.use("/api/auth", userRouter)
    server.use("/api/products", productsRouter)
    server.use("/api/cards", cardsRouter)

    // // Next.js default request handler
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res)
    })

    server.listen(port, () => {
      // NodeJS.ErrnoException tipini kullanın

      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex: any) => {
    // console.error(ex.stack)
    process.exit(1)
  })
