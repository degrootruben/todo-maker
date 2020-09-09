const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.get("/", controller.index);
router.get("/get-list", controller.getList);
router.post("/", controller.createToDo);

module.exports = router;

