const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Saint Michel",
      version: "1.0.0",
      description: "Documentação da API do sistema hospitalar",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "../router/*.js")],
};
const swaggerSpec = swaggerJsdoc(options);
console.log(swaggerSpec.paths);

module.exports = swaggerSpec;
