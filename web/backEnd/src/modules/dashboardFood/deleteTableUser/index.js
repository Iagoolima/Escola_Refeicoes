const express = require('express');
const cors = require('cors');

const router = express.Router();

const db = require('../../../dataBase/index');
router.use(cors());

router.delete('/', (req, res) => {
  const { name, food } = req.query;
  console.log(`Tentativa de apagar a seleção: ${food} para o usuario ${name} `)


  db.query(
    'DELETE FROM table_food_user WHERE name = ? AND food = ?',
    [name, food],
    (error, results) => {
      if (error) {
        console.log(`erro ao salvar café ${error}`)
        res.sendStatus(500);
      } else {
        console.log(`seleção excluida com sucesso : ${food}`);
        res.sendStatus(200)
      }
    }
  )

})

module.exports = router;