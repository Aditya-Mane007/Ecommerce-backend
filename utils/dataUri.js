const DatauriParser = require('datauri/parser')
const path = require("path")


const getUri = (image) => {
  console.log(image)
  const parser = new DatauriParser()
  const extName = path.extname(image.originalname).toString()
  return parser.format(extName,image.buffer)
}

module.exports = getUri