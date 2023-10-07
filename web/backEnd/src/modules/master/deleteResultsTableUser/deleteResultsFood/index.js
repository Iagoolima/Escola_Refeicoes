const express = require('express');
const router = express.Router();
const db = require('../../../../dataBase/index');

router.delete('/', (req, res) => {
  db.query(
    'DELETE FROM table_food_user',
    (error, results) => {
      if (error) {
        console.error('erro ao apagar tabela de resultado do almoço do usuario', error);
        res.status(500).json({ error: 'Erro ao apagar tabela' });
      } else {
        console.log('tabela de resultado do almoço excluida');
        res.json(results);
      }
    }
  );
});

module.exports = router;
