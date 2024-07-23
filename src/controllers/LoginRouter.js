const express = require("express");
const router = express.Router();

// USER LOGIN
router.post("/", async (request, response, next) => {
  response.json({
    message: "This is the user login route",
  });
});

// USER FORGET PASSWORD
router.post("/password-reset/", async (request, response, next) => {
  response.json({
    message: "This is the user reset passord route",
  });
});

module.exports = router;