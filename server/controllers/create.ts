import express, { Request, Response } from "express"
import pool from "../db"
import fileupload, { UploadedFile } from "express-fileupload"
import dotenv from "dotenv"
dotenv.config({ path: __dirname + "/.env" })

export const createCardController = async (req: Request, res: Response) => {
  const connection = await pool.getConnection()
  try {
    const file = req?.files?.file as UploadedFile

    const { name } = file

    await file.mv(__dirname + `../../../public/uploads/${name}`)

    const { title, category, price } = req.body
    const query = "INSERT INTO cards (title, category, price, image) VALUES (?, ?, ?, ?)"
    const [rows, fields] = await connection.execute(query, [title, category, price, name])

    console.log("Card added successfully.")
    res.send("Card added successfully.")
  } catch (error) {
    console.error(error)
    res.status(500).send("error while uploading.")
  } finally {
    connection.release()
  }
}
