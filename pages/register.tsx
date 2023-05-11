import type { NextPage } from "next"
import { useRef, useState } from "react"
import Axios from "axios"
import { useRouter } from "next/navigation"

const Register: NextPage = () => {
  // ** States
  const [errMsg, setErrMsg] = useState<string[]>([])
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const passConfRef = useRef<HTMLInputElement>(null)

  const { push } = useRouter()

  const registerHandler = () => {
    register(usernameRef?.current?.value!, emailRef?.current?.value!, passRef?.current?.value!, passConfRef?.current?.value!)
  }

  const register = async (username: string, email: string, pass: string, passConf: string) => {
    Axios.post("http://localhost:3000/api/auth/register", { username, email, pass, passConf })
      .then((response) => {
        console.log(response.data)
        setErrMsg([])
        localStorage.setItem("token", response.data.token)
        push("/")
      })
      .catch((error) => {
        if (error.response.data.data.errors) {
          setErrMsg(error.response.data.data.errors)
        } else {
          setErrMsg([])
        }
        console.log(error.response)
      })
  }
  return (
    <div className="pages register">
      <div className="pageWrapper">
        <div className="register_wrapper">
          <h2>Registration</h2>
          <div>
            {errMsg?.map((error, index) => (
              <p key={index}>{error}</p>
            ))}{" "}
          </div>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input id="username" ref={usernameRef} type="text" name="username" autoComplete="off" />
          </div>
          <div className="email">
            <label htmlFor="email">e-mail</label>
            <input id="email" ref={emailRef} type="text" name="email" autoComplete="off" />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input id="password" ref={passRef} type="password" name="password" autoComplete="off" />
          </div>
          <div className="passwordConfirmation">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input id="passwordConfirmation" ref={passConfRef} type="password" name="passwordConfirmation" autoComplete="off" />
          </div>
          <div className="actionBtn">
            <button onClick={registerHandler}>Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
