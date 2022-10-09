const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/imagemanager.routes.js']

swaggerAutogen(outputFile, endpointsFiles)