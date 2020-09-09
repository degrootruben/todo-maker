const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.get("/", controller.index);
router.get("/get-tasks", controller.getTasks);
router.post("/", controller.createTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;

