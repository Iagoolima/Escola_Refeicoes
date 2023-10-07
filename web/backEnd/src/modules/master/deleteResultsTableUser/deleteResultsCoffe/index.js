const express = require('express');
const router = express.Router();
const db = require('../../../../dataBase/index');

router.delete('/', (req, res) => {
  db.query(
    'DELETE FROM table_coffe_user',
    (error, results) => {
      if (error) {
        console.error('erro ao apagar tabela de resultado do café do usuario', error);
        res.status(500).json({ error: 'Erro ao apagar tabela' });
      } else {
        console.log('tabela de resultado do café da manhã excluida');
        res.json(results);
      }
    }
  );
});

module.exports = router;
