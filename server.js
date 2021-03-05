require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

//Cotroladores
const { listEntries, 
        getEntry,
        newEntry,
        editEntry, 
        deleteEntry,
        addEntryPhoto,
} = require("./controllers/entries");

//Middlewares del proyecto
const entryExists = require("./middlewares/entryExists");

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
app.get("/entries/:id",entryExists, getEntry);

//POST -/Entries
//Crea una nueva entrada 
app.post("/entries", newEntry);

//PUT -/ entries/:id
//edita una entra en la base de datos
app.put("/entries/:id",entryExists, editEntry);

//DELETE -/entries/:id
//Borra una entrada de la base de datos
app.delete("/entries/:id",entryExists, deleteEntry);

//POST -/entries/:id/photos
//añade una foto a una entrada
app.post("/entries/:id/photos",entryExists, addEntryPhoto);

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