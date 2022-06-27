const AppError = require("../utils/appError");
const conn = require("../services/db");


// Hello API - Message API
exports.helloAPI = (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the Hospital API",
  });
};



