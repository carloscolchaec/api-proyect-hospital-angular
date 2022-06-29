const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");
const conn = require("../services/db");
require("dotenv").config();

const jwtSecretKey = process.env.KEY_ACCESS_SECRET;

// SHOW ALL DATA PERSONS
exports.ControllerAllPersons = (req, res, next) => {
  conn.query("SELECT * FROM persona", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data.rows,
    });
  });
};

// EDIT PERSON
exports.ControllerEditPerson = (req, res, next) => {
  let {
    cedula,
    nombres,
    apellidos,
    tipo_persona,
    especialidad,
    celular,
    correo,
    fecha_nacimiento,
    genero,
    ocupacion,
    tipo_sangre,
    ciudad,
    password,
  } = req.body;

  let passwordEncript = sha256(password);

  conn.query(
    `SELECT * FROM persona WHERE cedula = '${cedula}'`,
    function (err, data, fields) {
      if (data.rowCount >= 1) {
        conn.query(
          `UPDATE persona
          SET apellidos='${apellidos}', nombres='${nombres}', tipo_persona='${tipo_persona}', especialidad='${especialidad}', celular='${celular}', correo='${correo}', fecha_nacimiento='${fecha_nacimiento}', genero='${genero}', ocupacion='${ocupacion}', tipo_sangre='${tipo_sangre}', ciudad='${ciudad}', password='${passwordEncript}'
          WHERE cedula='${cedula}';`,
          function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
              status: "success",
              created: "OK",
              report: "USER UPDATED",
            });
          }
        );
      } else {
        if (err) return next(new AppError(err, 500));
        res.status(200).json({
          status: "failed",
          created: "BAD",
          report: "THERE ARE NO DATA IN THE DATABASE TO MODIFY",
        });
      }
    }
  );
};

// DELETE PERSON
exports.ControllerDeletePerson = (req, res, next) => {
  let { cedula } = req.body;
  
  conn.query(
    `SELECT * FROM persona WHERE cedula = '${cedula}'`,
    function (err, data, fields) {
      console.log(data);
      if (data.rowCount >= 1) {
        conn.query(
          `DELETE FROM persona where cedula = '${cedula}'`,
          function (err, data, fields) {
            if (err) return next(new AppError(err));
            res.status(200).json({
              status: "success",
              report: "THE SELECTED USER HAST BEEN DELETED",
            });
          }
        );
      } else {
        if (err) return next(new AppError(err, 500));
        res.status(200).json({
          status: "failed",
          created: "BAD",
          report: "USER NOT FOUND IN THE DATABASE",
        });
      }
    }
  );
};

// REGISTER
exports.ControllerRegister = (req, res, next) => {
  let {
    cedula,
    nombres,
    apellidos,
    tipo_persona,
    especialidad,
    celular,
    correo,
    fecha_nacimiento,
    genero,
    ocupacion,
    tipo_sangre,
    ciudad,
    password,
  } = req.body;

  let passwordEncript = sha256(password);

  conn.query(
    `SELECT * FROM persona WHERE cedula = '${cedula}'`,
    function (err, data, fields) {
      if (data.rowCount >= 1) {
        if (err) return next(new AppError(err, 500));
        res.status(200).json({
          status: "failed",
          created: "BAD",
          report: "USER ALREADY EXISTS",
        });
      } else {
        conn.query(
          `INSERT INTO persona (cedula, apellidos, nombres, tipo_persona, especialidad, celular, correo, fecha_nacimiento, genero, ocupacion, tipo_sangre, ciudad, password) 
        VALUES ('${cedula}','${apellidos}','${nombres}','${tipo_persona}'::INTEGER,'${especialidad}'::INTEGER, '${celular}', '${correo}', '${fecha_nacimiento}', '${genero}', '${ocupacion}', '${tipo_sangre}', '${ciudad}', '${passwordEncript}');`,
          function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
              status: "success",
              created: "OK",
              report: "USER CREATED",
            });
          }
        );
      }
    }
  );
};

// LOGIN
exports.ControllerLogin = (req, res, next) => {
  let { cedula, password } = req.body;
  let passwordEncript = sha256(password);
  conn.query(
    `SELECT * FROM persona WHERE cedula = '${cedula}' AND password = '${passwordEncript}'`,
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
        };
        let tokenGeneated = generateAccessToken(datGetUser);

        function generateAccessToken(data) {
          return jwt.sign(data, jwtSecretKey, { expiresIn: "3h" });
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
