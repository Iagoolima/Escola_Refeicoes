const express = require('express');
const router = express.Router();
const db = require('../../dataBase/index');
const crypto = require('crypto');

router.post('/', (req, res) => {
    const { user } = req.body;
    const encryptedUser = crypto.createHash('md5').update(user).digest('hex');

    console.log(`Tentativa de login com ${user}`);

    db.query(
        'SELECT * FROM login WHERE user = ?',
        [user],
        (error, results) => {
            if (error) {
                console.log(`Erro ao executar a query ${error}`);
                res.sendStatus(500);
            } else {
                if (results.length > 0) {
                    const usuario = {
                        user: results[0].user,
                        name: results[0].name,
                        type: results[0].type,
                        id: results[0].id
                    };
                    console.log(`Usuário encontrado -> ${results[0].name} e tipo -> ${results[0].type}`);
                    res.status(200).json(usuario);
                } else {
                    console.log('Usuário não encontrado');
                    res.sendStatus(401);
                }
            }
        }
    );
});

module.exports = router;
