const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Secure route: Only authenticated administrators can access internal metrics and audit telemetry
router.get('/', protect, adminOnly, getStats);

module.exports = router;
