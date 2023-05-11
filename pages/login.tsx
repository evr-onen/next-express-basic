import type { NextPage } from "next"
import { useRef, useState } from "react"
import Axios from "axios"
import { useRouter } from "next/navigation"

const Login: NextPage = () => {
  // ** States
  const [errMsg, setErrMsg] = useState<string[]>([])
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  const { push } = useRouter()

  const loginHandler = () => {
    login(emailRef?.current?.value!, passRef?.current?.value!)
  }

  const login = async (email: string, pass: string) => {
    Axios.post("http://localhost:3000/api/auth/login", { email, pass })
      .then((response) => {
        console.log(response.data)
        localStorage.setItem("token", response.data.token)
        setErrMsg([])
        // push("/")
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
    <div className="pages login">
      <div className="pageWrapper">
        <div className="login_wrapper">
          <h2>Login</h2>
          <div>
            {errMsg?.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
          <div className="email">
            <label htmlFor="email">e-mail</label>
            <input id="email" ref={emailRef} type="text" name="email" autoComplete="off" />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input id="password" ref={passRef} type="password" name="password" autoComplete="off" />
          </div>
          <div className="actionBtn">
            <button onClick={loginHandler}>login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
