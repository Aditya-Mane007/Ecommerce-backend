const DatauriParser = require('datauri/parser')
const path = require("path")


const getUri = (image) => {
  const parser = new DatauriParser()
  const extName = path.extname(image.originalname).toString()
  console.log(extName)
  return parser.format(extName,image.buffer)
}

module.exports = getUri