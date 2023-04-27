import express, { Request, Response, Express } from "express"
import next from "next"
import dotenv from "dotenv"
dotenv.config({ path: __dirname + "/.env" })
import userRouter from "./routes/users"

const port = process.env.PORT || 3000

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server: Express = express()

    // Custom Express.js Middleware
    server.use(express.json()) // JSON request body parsing

    // Custom Express.js Route Handlers
    server.use("/api/users", userRouter)

    // server.get("/api/data", (req: Request, res: Response) => {
    //   // API endpoint işlemleri
    //   res.json({ data: "Hello World!" })
    // })

    // // Next.js default request handler
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res)
    })

    // Express.js Server Başlatma
    server.listen(port, () => {
      // NodeJS.ErrnoException tipini kullanın

      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex: any) => {
    console.error(ex.stack)
    process.exit(1)
  })
