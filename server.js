require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//Cotroladores
const { listEntries, getEntry, newEntry } = require("./controllers/entries");

const {PORT} = process.env;

//creo la app de express

const app = express();
app.nombre = 'Ale';

//aplico middlewares

//logger
app.use(morgan('dev'));

//Body Parsers (body en json)
app.use(bodyParser.json());

//Body parser multipart form data <--subida de imagenes
app.use(fileUpload());




//Rutas de la API

//GET -/entries
//Devuelve todos los elementos de la tabla entries
app.get("/entries", listEntries);

//GET -/entries:id
//devuelve  una entrada solo
app.get("/entries/:id", getEntry);

//POST -/Entries
//Crea una nueva entrada 
app.post("/entries", newEntry);

//Middleware de error
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500).send({
        status: "error",
        message: error.message,
    });
});

//Middleware de 404
app.use((req, res) => {
    res.status(404).send({
        status: "error",
        message: "Not found",
    });

});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT} `);
})