const express = require('express');
const router = express.Router();
const db = require('../../../../dataBase/index');

router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM table_food',

    (error, results) => {
      if (error) {
        console.error('erro ao buscar itens do banco de dados do almoço', error);
        res.status(500).json({ error: 'Erro ao buscar itens do banco de dados do almoço' });
      } else {
        console.log('tabela do dia atualizada -> almoço');
        res.json(results);
      }
    }
  );
});

module.exports = router;
