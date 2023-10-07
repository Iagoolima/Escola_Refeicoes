const express = require('express');
const router = express.Router();
const db = require('../../../../dataBase/index');


router.post('/', (req, res) => {
    const { coffes } = req.body;

    if (!coffes || !Array.isArray(coffes)) {
        return res.status(400).json({ error: 'Invalid request data' })
    }
    coffes.forEach((coffe) => {
        db.query(
            'INSERT INTO table_coffe (coffe) VALUES (?)',
            [coffe],
            (error, results) => {
                if (error) {
                    console.error('error inserting coffe ', error);
                } else {
                    console.log('item de café da manhã inserido com suceesso ->', coffe)
                }
            }
        )
    });

    res.status(200).json({ message: 'caffe inserido com sucesso' })
});

module.exports = router;