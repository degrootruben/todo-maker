const express = require('express');
const apiController = require('../controllers/apiController');

const router = express.Router();

router.get("/v1/get-tasks", apiController.getTasks);
router.get("/v1/get-userid", apiController.getUserID);
router.get("/v1/get-useremail", apiController.getUserEmail);
router.post("/v1/create-task", apiController.createTask);
router.delete("/v1/:id", apiController.deleteTask);

module.exports = router;

