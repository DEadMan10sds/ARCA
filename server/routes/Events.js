const express = require('express');
const router = express.Router();
const {Event} = require('../models');
const {validateToken} = require('../middleware/AuthMiddleware');

router.get('/', async (req, res) => {
    const eventsList = await Event.findAll();
    res.json(eventsList);
});

router.post('/', validateToken, async (req, res) => {
    const newEvent = req.body;
    await Event.create(newEvent);
    res.json(newEvent);
});

router.get('/:eventID', async (req, res) => {
    const event = await Event.findByPk(req.params.eventID);
    res.json(event);
});

router.put('/:eventID', validateToken, async (req, res) => 
{
    const event = await Event.findByPk(req.params.eventID);
    await event.update(req.body);
    res.json(event);
});

router.delete('/:eventID', async (req, res) =>
{
    const event = await Event.findByPk(req.params.eventID);
    await event.destroy();
    res.json(event);
});

module.exports = router;