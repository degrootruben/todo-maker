const express = require('express');
const controller = require('../controllers/controller');
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", controller.index);
router.use("/tasks", requireAuth);
router.get("/tasks", controller.tasks);
router.get("/get-tasks", controller.getTasks);
router.post("/", controller.createTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;

