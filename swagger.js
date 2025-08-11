import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endPointsFiles = ['./app.js'];

//config de la documentacion
const doc = {
    info: {
        title: "API de adopcion de mascotas",
        description: "Esta API permite gestionar mascotas y usuarios"
    },
    host: 'localhost:5100',
    schemes: ['http']
}

swaggerAutogen()(outputFile, endPointsFiles, doc);