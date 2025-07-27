const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'IVONUTRI API',
        description: 'Cette API permet d’accéder au système IVONUTRI. Elle offre des fonctionnalités pour gérer les profils nutritionnels, suivre les recommandations etc. Les principaux modules incluent l’authentification, la gestion des aliments, le traitement des recommandation etc..'
    },
    host: 'localhost:3001',
    schemes: ['https', 'http'],
    tags: [
        {
            name: 'Users',
            description: 'Gestion des utilisateurs',
        },
        {
            name: 'Profils nutritionnels',
            description: 'Gestion des profils nutritionnels',
        },
        {
            name: 'Préférences utilisateur',
            description: 'Gestion des préférences',
        }
    ]
}

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

//This will generate swagger.json
swaggerAutogen(outputFile, routes, doc);