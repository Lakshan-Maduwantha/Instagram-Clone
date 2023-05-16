const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/imageRoutes.js', './routes/userRoutes.js','./routes/commentRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require('./app.js');
});