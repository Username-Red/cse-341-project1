const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: "Contacts API",
        description: "Contacts API"
    },
    host:"project1-qbgs.onrender.com",
    schemes: ["https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);