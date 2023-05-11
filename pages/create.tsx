import Axios from "axios"
import React, { MutableRefObject, useRef, useState } from "react"

const Create = () => {
  const [errMsg, setErrMsg] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement | null>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const categoryRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  const createCard = () => {
    if (fileRef) {
      const file = fileRef.current!.files![0]
      const formData = new FormData()
      formData.append("file", file)
      formData.append("title", titleRef.current!.value)
      formData.append("category", categoryRef.current!.value)
      formData.append("price", priceRef.current!.value)

      Axios.post("/api/cards/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  return (
    <div className="create pageWrapper">
      <div className="panel_wrapper">
        <div className="input_wrapper">
          <div>
            <label htmlFor="file">Upload Image : </label>
            <input id="file" ref={fileRef} type="file" autoComplete="off" />
          </div>
        </div>
        <div className="input_wrapper">
          <label htmlFor="title">Title :</label>
          <input id="title" ref={titleRef} type="text" autoComplete="off" />
        </div>
        <div className="input_wrapper">
          <label htmlFor="category">Category :</label>
          <input id="category" ref={categoryRef} type="text" autoComplete="off" />
        </div>
        <div className="input_wrapper">
          <label htmlFor="price">Price :</label>
          <input id="price" ref={priceRef} type="text" autoComplete="off" />
        </div>
        <div className="btn_wrapper">
          <button onClick={createCard}>send</button>
        </div>
      </div>
    </div>
  )
}

export default Create
