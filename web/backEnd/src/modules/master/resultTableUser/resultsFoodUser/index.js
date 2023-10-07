const express = require('express');
const router = express.Router();

const db = require('../../../../dataBase/index');

router.get('/', (req, res) => {
  db.query(
    'SELECT food, COUNT(*) as total FROM table_food_user GROUP BY food ORDER BY total DESC',
    (error, results) => {
      if (error) {
        console.error('Erro ao consultar banco de dados do usuário');
        res.sendStatus(500);
      } else {
        console.log('Resultado atualizado -> Almoço');
        res.json(results);
      }
    }
  );
});

module.exports = router;
