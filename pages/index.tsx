import type { GetServerSidePropsContext, NextPage } from "next"
import { useState } from "react"
import Axios from "axios"
import jwt from "jsonwebtoken"

// ** Components
import Card from "../src/components/card"

// ** types
type DataType = {
  id: number
  name: string
  category: string
}
interface PropsType {
  data: DataType[]
  className: string
}

const index = (props: PropsType) => {
  console.log(props)
  const { data } = props

  // ** States
  const [productData, setProductData] = useState<DataType[]>(data)
  const renderCards = () => {
    if (!data) return
    return productData.map((product) => {
      return <Card data={product} key={product.id} />
    })
  }

  return (
    <div className="home pageWrapper">
      <div className="cardsWrapper">{renderCards()}</div>
    </div>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { token } = context.req.cookies

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string)
    console.log(decodedToken)
    const response = await Axios.get("http://localhost:3000/api/products/")
    return {
      props: {
        data: response.data.rows,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        data: null,
      },
    }
  }
}

// export const getServerSideProps = async (context: any) => {
//   const { token } = context.req.cookies
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   }

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     }
//   }
//   try {
//     const data = await Axios.get("http://localhost:3000/api/products/", { headers })
//     return {
//       props: { data },
//     }
//   } catch (error) {
//     // console.log(error)
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     }
//   }
// }

export default index

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token}`,
// }
// const response = await Axios.get("/api/products", { headers })
//   .then((response) => {
//     console.log(response.data)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

// return {
//   props: { params: response },
// }
