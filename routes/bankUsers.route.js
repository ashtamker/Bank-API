const express = require('express');
const router = express.Router();
const bankUsersController = require("../controllers/bankUsers.Controller");

router
.get("/", bankUsersController.allBankUsers)
.post("/", bankUsersController.newUser)


module.exports = router;