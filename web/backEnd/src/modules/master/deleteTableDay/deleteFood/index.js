const express = require('express');
const router = express.Router();
const db = require('../../../../dataBase/index');

router.delete('/', (req, res) => {
  db.query(
    'DELETE FROM table_food',
    (error, results) => {
      if (error) {
        console.error('erro ao apagar tabela do alomo', error);
        res.status(500).json({ error: 'Erro ao apagar tabela almoço' });
      } else {
        console.log('tabela do almoço excluida');
        res.json(results);
      }
    }
  );
});

module.exports = router;
