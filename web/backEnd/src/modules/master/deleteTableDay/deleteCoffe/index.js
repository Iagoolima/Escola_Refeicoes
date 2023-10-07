const express = require('express');
const router = express.Router();
const db = require('../../../../dataBase/index');

router.delete('/', (req, res) => {
  db.query(
    'DELETE FROM table_coffe',
    (error, results) => {
      if (error) {
        console.error('erro ao apagar tabela do café', error);
        res.status(500).json({ error: 'Erro ao apagar tabela' });
      } else {
        console.log('tabela do café da manhã excluida');
        res.json(results);
      }
    }
  );
});

module.exports = router;
