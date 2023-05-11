import React from "react"

// ** Types
type DataType = {
  id: number
  name: string
  category: string
}
interface PropsType {
  data: DataType
}

const Card = (props: PropsType) => {
  const { data } = props
  return (
    <div className="card wrapper ">
      <div className="imageWrapper"></div>
      <div className="content">
        <div className="row">
          <h4>{data.name}</h4>
        </div>
        <div className="row">
          <h4>Category</h4>
          <h4>: {data.category}</h4>
        </div>
        <div className="row">
          <h4>price</h4>
          <h4>: price</h4>
        </div>
      </div>
    </div>
  )
}

export default Card
