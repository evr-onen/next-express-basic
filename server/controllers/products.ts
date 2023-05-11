import express, { Request, Response } from "express"
import pool from "../db"

import dotenv from "dotenv"
dotenv.config({ path: __dirname + "/.env" })

export const getProductsController = async (req: Request, res: Response) => {
  const connection = await pool.getConnection()
  try {
    const query = "SELECT * FROM products"
    const [rows, fields] = await connection.execute(query)

    res.status(201).send({ rows })
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: error as Error })
  } finally {
    connection.release()
  }
}
