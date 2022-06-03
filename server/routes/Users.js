const express = require('express');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const { validateToken } = require('../middleware/AuthMiddleware');


router.post('/', async (req, res) => {
    const {name, surname, email, phone, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
       User.create({
            name:name, 
            surname:surname,
            email:email, 
            phoneNumber:phone, 
            password: hash,
            role:"user"
        });
       res.json("Usuario creado"); 
    });
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email: email}});
    if(!user) res.json({error: "Usuaro no encontrado"});
    else 
    {
        const match = await bcrypt.compare(password, user.password);
        if(!match) res.json({error: "Contraseña incorrecta"});
        else
        {
            const accesToken = sign({id: user.id, name:user.name, surname:user.surname, email:user.email , role: user.role}, "importantSecret");
            res.json({token: accesToken, id: user.id, name:user.name, surname:user.surname, email:user.email , role: user.role});
        } 
    }
});

router.get('/verify', validateToken, (req, res) => {
    res.json(req.user);
})

router.get('/:userID', validateToken, async (req, res) => {
    const user = await User.findByPk(req.params.userID, {attributes: {exclude: ['password', 'role', 'createdAt', 'updatedAt']}});
    res.json(user);
});

module.exports = router;