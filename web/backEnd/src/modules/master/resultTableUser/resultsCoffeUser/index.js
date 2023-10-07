const express = require('express');


const router = express.Router();

const db = require('../../../../dataBase/index');

router.get('/', (req, res) => {
  db.query(
    'SELECT coffe, COUNT(*) as total FROM table_coffe_user GROUP BY coffe ORDER BY total DESC',
    (error, results) => {
      if (error) {
        console.error('Erro ao consultar banco de dados do usuário');
        res.sendStatus(500);
      } else {
        console.log('Resultado Atualizado -> café da manha');
        res.json(results);
      }
    }
  );
});

module.exports = router;
