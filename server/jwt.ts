import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({ path: __dirname + "/.env" })

const secret = process.env.SECRET_KEY as string
console.log(secret)
function generateToken(user: { username: string; email: string }): string {
  const payload = { username: user.username, email: user.email }
  return jwt.sign(payload, secret, { expiresIn: "12h" })
}

function verifyToken(token: string): { username: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded as { username: string; email: string }
  } catch (error) {
    console.error(error)
    return null
  }
}

export { generateToken, verifyToken }
