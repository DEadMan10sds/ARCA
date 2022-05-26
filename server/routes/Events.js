const express = require('express');
const router = express.Router();
const {Event} = require('../models');

router.get('/', async (req, res) => {
    const eventsList = await Event.findAll();
    res.json(eventsList);
});

router.post('/', async (req, res) => {
    const newEvent = req.body;
    await Event.create(newEvent);
    res.json(newEvent);
});

module.exports = router;