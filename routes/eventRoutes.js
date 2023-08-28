const express = require('express');
const eventController = require('../controllers/EventController');

const router = express.Router();

router.post('/events', eventController.receiveEvent);
router.get('/process-events', eventController.processEvents);

module.exports = router;
