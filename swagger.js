const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'IVONUTRI API',
    description: "un service web dédié au backend de l'application Ivonutri, une application conçue pour aider les utilisateurs à adopter une alimentation saine afin d'améliorer leur santé. Ce service permet la gestion des profils nutritionnels, des préférences des utilisateurs, ainsi que des informations les concernant via une API RESTful.",
  },
  host: 'ivonutri-backend.onrender.com',
  schemes: ['https'],
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
