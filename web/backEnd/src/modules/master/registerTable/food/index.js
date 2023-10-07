const express = require('express');
const router = express.Router();
const db = require('../../../../dataBase/index');


router.post('/', (req, res) => {
    const { foods } = req.body;

    if (!foods || !Array.isArray(foods)) {
        return res.status(400).json({ error: 'invalid request data' })
    }
    foods.forEach((foods) => {
        db.query(
            'INSERT INTO table_food (food) VALUES (?)',
            [foods],
            (error, results) => {
                if (error) {
                    console.error('error inserting coffe', error);
                } else {
                    console.log('intem de almoço inserido com sucesso ->', foods)
                }
            }
        )
    })
    res.status(200).json({ message: 'almoço inserido com sucesso' })
})

module.exports = router;