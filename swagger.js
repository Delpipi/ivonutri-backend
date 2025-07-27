const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'IVONUTRI API',
    description: 'Cette API permet d’accéder au système IVONUTRI...',
  },
  host: 'localhost:3001',
  schemes: ['http', 'https'],
  tags: [
    { name: 'Users', description: 'Gestion des utilisateurs' },
    { name: 'Profils nutritionnels', description: 'Gestion des profils nutritionnels' },
    { name: 'Préférences utilisateur', description: 'Gestion des préférences' }
  ],
  definitions: {
    User: {
        nom: "string",
        email: "string",
        role: "string",
        langue: "string",
        profilNutritionnelId: "string"
      },
    Preferences: {
        userId: "string",
        alimentsAimes: ["string"],
        alimentsEvites: ["string"],
        allergies: ["string"],
        regimes: ["string"]
      },
    Nutritionnels: {
        genre: "string",
        age: "string",
        poids: "string",
        taille: "string",
        niveauActivite: "string",
        objectif: "string",
        besoinsCaloriques: "number",
        pathologies: ["string"]
    }
  }
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
