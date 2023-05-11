import pool from "../db"
import { UserDataBaseType } from "../../types/user"
export class User {
  static async findByEmail(email: string) {
    const [rows, fields] = await pool.execute("SELECT * FROM users WHERE email = ?", [email])
    return (rows as Array<UserDataBaseType>)[0]
  }
}
