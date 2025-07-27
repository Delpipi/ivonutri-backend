const express = require('express');
const router = express.Router();

/**
 * #swagger.tags = ['Test']
 * #swagger.summary = 'Route de test simple'
 */
router.get('/test', (req, res) => {
  res.send('Test réussi');
});

module.exports = router;