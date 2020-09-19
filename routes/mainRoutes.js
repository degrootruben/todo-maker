const express = require('express');
const mainController = require("../controllers/mainController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", mainController.index);
router.use("/tasks", requireAuth);
router.get("/tasks", mainController.tasks);

module.exports = router;