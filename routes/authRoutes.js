const { Router } = require("express");
const authControllers = require("../controllers/authControllers");

const router = Router();

router.post("/Sign", authControllers.CreateUser);
router.post("/Login", authControllers.Login);
router.post("/SetName", authControllers.SetName);
router.post("/Logout", authControllers.Logout);

module.exports = router;
