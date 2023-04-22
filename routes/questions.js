const express = require("express");
const router = express.Router();
const wyrController = require("../controllers/questions");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, todosController.getQuestion);
