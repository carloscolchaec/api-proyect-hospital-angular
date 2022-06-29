const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.allEspecialidades = (req, res, next) => {
  conn.query("SELECT * FROM especialidad", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data.rows,
    });
  });
};

exports.createEspecialidad = (req, res, next) => {
  let {
    id,
    descripcion,
    estado,
    nombre_especialidad,
    fecha_registro,
    fecha_modificacion,
  } = req.body;
  conn.query(
    `SELECT * FROM especialidad WHERE id = '${id}'`,
    function (err, data, fields) {
      if (data.rowCount >= 1) {
        if (err) return next(new AppError(err, 500));
        res.status(200).json({
          status: "failed",
          created: "BAD",
          report: "SPECIALTY ALREADY EXISTS",
        });
      } else {
        conn.query(
          `INSERT INTO especialidad(descripcion, estado, nombre_especialidad, fecha_registro, 
              fecha_modificacion) 
              VALUES ('${descripcion}','${estado}','${nombre_especialidad}','${fecha_registro}','${fecha_modificacion}');`,
          function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
              status: "success",
              created: "OK",
              report: "SPECIALTY CREATED",
            });
          }
        );
      }
    }
  );
};

// EDIT PERSON
exports.modifyEspecialidad = (req, res, next) => {
  let {
    id,
    descripcion,
    estado,
    nombre_especialidad,
    fecha_registro,
    fecha_modificacion,
  } = req.body;

  conn.query(
    `SELECT * FROM especialidad WHERE id = '${id}'`,
    function (err, data, fields) {
      if (data.rowCount >= 1) {
        conn.query(
          `UPDATE especialidad
          SET descripcion='${descripcion}', estado='${estado}', nombre_especialidad='${nombre_especialidad}', fecha_registro='${fecha_registro}', 
          fecha_modificacion='${fecha_modificacion}'
          WHERE id='${id}';`,
          function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
              status: "success",
              created: "OK",
              report: "SPECIALTY UPDATED",
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

exports.deleteEspecialidad = (req, res, next) => {
  let { id } = req.body;
  conn.query(
    `SELECT * FROM especialidad WHERE id = '${id}'`,
    function (err, data, fields) {
      console.log(data);
      if (data.rowCount >= 1) {
        conn.query(
          `DELETE FROM especialidad where id = '${id}'`,
          function (err, data, fields) {
            if (err) return next(new AppError(err));
            res.status(200).json({
              status: "success",
              report: "THE SELECTED SPECIALTY HAST BEEN DELETED",
            });
          }
        );
      } else {
        if (err) return next(new AppError(err, 500));
        res.status(200).json({
          status: "failed",
          created: "BAD",
          report: "SPECIALTY NOT FOUND IN THE DATABASE",
        });
      }
    }
  );
};
