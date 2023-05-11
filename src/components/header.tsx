import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { useUserStore } from "../stores/user"
import jwt_decode from "jwt-decode"
import nookies from "nookies"
import jwt from "jsonwebtoken"

type DecodedToken = {
  email: string
  username: string
  iat: number
}
type UserDataType = {
  username: string
  email: string
}

const Header = () => {
  // ** States
  const [userData, setUserData] = useState<UserDataType | null>(null)

  const headerRef = useRef<HTMLInputElement>(null)

  const userStore = useUserStore()
  useEffect(() => {
    if (localStorage?.getItem("token")) {
      const decodedToken: DecodedToken = jwt_decode(localStorage?.getItem("token")!)
      console.log(decodedToken)
      setUserData({ username: decodedToken.username, email: decodedToken.email })
    }

    // userStore.setUser(decodedToken)
  }, [])

  // useEffect(() => {

  //   userStore.setUser
  // }, [])
  // useEffect(() => {
  //   document.addEventListener("scroll", function () {
  //     navbarScroll()
  //   })
  // }, [])

  // const navbarScroll = () => {
  //   var y = window.scrollY
  //   if (y > 10) {
  //     headerRef.current?.classList.add("small")
  //     // $(".header").addClass("small")
  //   } else if (y < 10) {
  //     headerRef.current?.classList.remove("small")
  //     // $(".header").removeClass("small")
  //   }
  // }
  return (
    <nav className="header" ref={headerRef}>
      <h2>Hosgeldin {userData?.username}</h2>
      <ul>
        <li>
          <Link href="/login">login</Link>
        </li>
        <li>
          <Link href="/">home</Link>
        </li>
        <li>
          <Link href="/">Create</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
