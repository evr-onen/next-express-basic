import express, { Request, Response } from "express"
import pool from "../db"
import * as yup from "yup"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config({ path: __dirname + "/.env" })

import { User } from "../models/user"
import { UserDataBaseType } from "../../types/user"

export const registerController = async (req: Request, res: Response) => {
  const registerSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    pass: yup.string().min(6, "Şifre en az 6 karakter olmalıdır.").required("Şifre zorunlu bir alandır."),
    passConf: yup
      .string()
      .oneOf([yup.ref("pass")], "Şifreler eşleşmiyor.")
      .required("Şifre tekrarı zorunlu bir alandır."),
  })

  const connection = await pool.getConnection()
  const { username, email, pass, passConf } = req.body
  try {
    const hashedPassword = await bcrypt.hash(pass, 12)
    const data = {
      username: username,
      email: email,
      password: hashedPassword,
    }
    await registerSchema.validate({ username, email, pass, passConf })

    const query = "INSERT INTO users SET email=:email, username=:username, password=:password"
    const [rows, fields] = await connection.execute(query, data)

    const UserData: UserDataBaseType = await User.findByEmail(email)

    const token = jwt.sign({ email: UserData.email, username: UserData.username }, process.env.SECRET_KEY as string)
    res.status(201).send({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: error as Error })
  } finally {
    connection.release()
  }
}

export const loginController = async (req: Request, res: Response) => {
  const { email, pass } = req.body

  const connection = await pool.getConnection()
  try {
    const UserData: UserDataBaseType = await User.findByEmail(email)
    const username = UserData.username
    const isPasswordValid = await bcrypt.compare(pass, UserData.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" })
    }
    const token = jwt.sign({ email: UserData.email, username: UserData.username }, process.env.SECRET_KEY as string)
    res.cookie("token", token, {
      maxAge: 36000000, // cookie ömrü 1 saat olarak ayarlandı
      httpOnly: true,
      sameSite: "strict",
    })
    res.status(200).json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: error as Error })
  } finally {
    connection.release()
  }
}
