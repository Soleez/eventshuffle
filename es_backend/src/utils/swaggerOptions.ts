const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'evetshuffle-api',
      version: '1.0.0'
    }
  },
  apis: ['src/routes/events.ts'],
  swaggerOptions: {
      url: "/api-docs/swagger.json",
  },
}

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec
}