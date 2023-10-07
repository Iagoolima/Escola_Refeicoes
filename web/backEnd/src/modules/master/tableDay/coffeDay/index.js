const express = require('express');
const router = express.Router();
const db = require('../../../../dataBase/index');

router.get('/', (req, res) => {
  db.query(
    'SELECT * FROM table_coffe',

    (error, results) => {
      if (error) {
        console.error('erro ao buscar itens do banco de dados do café da manhã', error);
        res.status(500).json({ error: 'Erro ao buscar itens do banco de dados do café da manhã' });
      } else {
        console.log('tabela do dia atualizada -> Café da manhã');
        res.json(results);
      }
    }
  );
});

module.exports = router;
