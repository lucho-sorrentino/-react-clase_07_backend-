const express = require("express");
var mysql = require("mysql");
var cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const port = 5000;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "guayerd_crud",
});
connection.connect();

app.use(express.json());
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const corsValues = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.head("/actores", cors(corsValues), (req, res) => {
  console.info("HEAD /simple-cors");
  res.sendStatus(204);
});

app.get("/actores", cors(corsValues), (req, res) => {
  const consulta = "SELECT * FROM `actores`";
  connection.query(consulta, function (error, results) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json([]);
    }
  });
});

app.get("/actor/:id", cors(corsValues), (req, res) => {
  const { id } = req.params;
  const consulta = `SELECT * FROM actores WHERE id=${id}`;
  connection.query(consulta, function (error, results) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.json({});
    }
  });
});

app.post("/actores", urlencodedParser, (req, res) => {
  console.log(req.body);
  const consulta = `INSERT INTO actores SET ?`;
  const customObject = {
    apellido: req.body.apellido,
    nombre: req.body.nombre,
    pais: req.body.pais,
    fechanacimiento: req.body.fechanacimiento,
    foto: req.body.foto,
  };

  connection.query(consulta, customObject, (error) => {
    if (error) throw error;
    res.send("Se insertó el registro!");
  });
});

app.delete("/actores/:id", (req, res) => {
  const { id } = req.params;

  consulta = `DELETE FROM actores WHERE id=${id}`;
  connection.query(consulta, (error) => {
    if (error) throw error;
    res.send("Se eliminó el registro");
  });
});

app.put("/actores/:id", (req, res) => {
  const { id } = req.params;
  const { apellido, nombre, pais, fechanacimiento, foto } = req.body;

  const consulta = `UPDATE actores SET apellido="${apellido}" , nombre="${nombre}", pais="${pais}", fechanacimiento="${fechanacimiento}" , foto="${foto}" WHERE id=${id}`;
  connection.query(consulta, (error) => {
    if (error) throw error;
    res.json(results);
    res.send("Se actualizó la tabla!");
  });
});

// connection.end();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
