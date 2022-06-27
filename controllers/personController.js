const jwt = require("jsonwebtoken");
require("dotenv").config();

const AppError = require("../utils/appError");
const conn = require("../services/db");

let jwtSecretKey = process.env.KEY_ACCESS_SECRET;

// API: /login?cedula=variable&password=variable

exports.ControllerLogin = (req, res, next) => {
  let { cedula, password } = req.query;
  conn.query(
    `SELECT * FROM persona WHERE cedula = '${cedula}' AND password = '${password}'`,
    function (err, data) {
      if (err) return next(new AppError(err, 500));

      if (data.rows.length === 0) {
        res.status(200).json({
          status: "error",
          access: "BAD",
          data: null,
        });
      } else {
        const datGetUser = {
          name: data.rows[0].nombres,
          lastname: data.rows[0].apellidos,
          email: data.rows[0].correo,
        }
  
        console.log(datGetUser)
  
        let tokenGeneated = generateAccessToken(datGetUser);
  
        function generateAccessToken(data) {
          return jwt.sign(data, jwtSecretKey, { expiresIn: '3h' });
        }
        res.status(200).json({
          status: "success",
          access: "OK",
          data: tokenGeneated,
        });
      }
    }
  );
};
