const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get("/v1/get-tasks", apiController.getTasks);
router.post("/v1/", apiController.createTask);
router.delete("/v1/:id", apiController.deleteTask);

module.exports = router;

