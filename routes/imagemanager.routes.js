const router = require("express").Router();
const { param } = require('express-validator');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

let dataController = require("../controllers/data.controllers");

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.post("/data", dataController.post);

router.get("/data/:id", 
    param("id").isNumeric().withMessage("Id debe ser numerico"),
    dataController.get);

router.get("/data/:id/image", 
    param("id").isNumeric().withMessage("Id debe ser numerico"),
    dataController.getImage);

module.exports = router;