const options = {
    autoHeaders: true,
    autoQuery: false,
    autoBody: false
}


const swaggerAutogen = require('swagger-autogen')(options)


const outputFile = './swagger_output.json'
const endpointsFiles = ['./index.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "node-blog-ms5e.onrender.com",
    basePath: "/",
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    cors: true,
    securityDefinitions: {
        Bearer:{
            type: 'apiKey',
            in: "header",
            name: "authorization",
            description: "any description...",
            bearerFormat: 'JWT'
        }
    },

}



swaggerAutogen(outputFile, endpointsFiles,doc)
