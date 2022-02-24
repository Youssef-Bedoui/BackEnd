const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController")

router.post("/", userController.createUser );

router.put("/:id", userController.updateUser);

router.get("/", userController.getAllUsers);

router.get("/:id",userController.getUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;