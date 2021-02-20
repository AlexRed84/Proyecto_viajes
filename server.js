require('dotenv').config();
const express = require('express');

const morgan = require('morgan');

//Cotroladores
const { listEntries } = require("./controllers/entries");

const {PORT} = process.env;

//creo la app de express

const app = express();
app.nombre = 'Ale';

//aplico middlewares
app.use(morgan('dev'));


//Rutas de la API

//GET -/entries
//Devuelve todos los elementos de la tabla entries
app.get("/entries", listEntries);



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