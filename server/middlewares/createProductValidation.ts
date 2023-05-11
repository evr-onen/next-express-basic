import * as yup from "yup"
import { Request, Response, NextFunction } from "express"
import { UploadedFile } from "express-fileupload"

const validTypes = ["image/jpeg", "image/png", "image/gif"]
const schema = yup.object().shape({
  file: yup.mixed().test("file", "Bir resim dosyası yüklemeniz gerekiyor.", (value: any) => {
    return value && validTypes.includes(value?.mimetype)
  }),

  title: yup.string().required(),
  category: yup.string().required(),
  price: yup.string().required(),
})

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { title, category, price } = req.body

  try {
    console.log(req?.files?.file)
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files here")
    }
    const file = req?.files?.file as UploadedFile
    await schema.validate({ file, title, category, price })
    next()
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
