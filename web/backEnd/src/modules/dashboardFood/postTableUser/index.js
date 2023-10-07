const express = require('express');
const cors = require('cors');

const router = express.Router();

const db = require('../../../dataBase/index');
router.use(cors());

router.post('/', (req, res) => {
  const { name, food } = req.body;
  console.log(`Tentativa de salvar seleção: ${food} para o usuario ${name} `)


  db.query(
    'INSERT INTO table_food_user (name, food) VALUES (?, ?)',
    [name, food],
    (error, results) => {
      if (error) {
        console.log(`erro ao salvar café ${error}`)
        res.sendStatus(500);
      } else {
        console.log(`seleção salva com sucesso : ${food}`);
        res.sendStatus(200)
      }
    }
  )

})

module.exports = router;