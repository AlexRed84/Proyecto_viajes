require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

//Cotroladores de entradas
const {
  listEntries,
  getEntry,
  newEntry,
  editEntry,
  deleteEntry,
  addEntryPhoto,
  deleteEntryPhoto,
  voteEntry,
} = require("./controllers/entries");

//Controladores de usuarios

const {
  newUser,
  validateUser,
  loginUser,
  getUser,
  deleteUser,
  editUser,
  editUserPass,
  recoverUserPass,
  resetUserPass,
} = require("./controllers/users");

//Middlewares del proyecto
const entryExists = require("./middlewares/entryExists");
const userExists = require("./middlewares/userExists");
const isUser = require("./middlewares/isUser");
const canEdit = require("./middlewares/canEdit");

const { PORT } = process.env;

//creo la app de express

const app = express();
app.nombre = "Ale";

//aplico middlewares

//logger
app.use(morgan("dev"));

//Body Parsers (body en json)
app.use(bodyParser.json());

//Body parser multipart form data <--subida de imagenes
app.use(fileUpload());

//uso de cors
app.use(cors());

app.use(express.static("static"));
//Rutas de la API

/* 
        Rutas de Entradas
*/

//GET -/entries
//Devuelve todos los elementos de la tabla entries
app.get("/entries", listEntries);

//GET -/entries:id
//devuelve  una entrada solo
app.get("/entries/:id", entryExists, getEntry);

//POST -/Entries
//Crea una nueva entrada
app.post("/entries", isUser, newEntry);

//PUT -/ entries/:id
//edita una entra en la base de datos
app.put("/entries/:id", isUser, entryExists, canEdit, editEntry);

//DELETE -/entries/:id
//Borra una entrada de la base de datos
app.delete("/entries/:id", entryExists, canEdit, deleteEntry);

//POST -/entries/:id/photos
//añade una foto a una entrada
app.post("/entries/:id/photos", entryExists, addEntryPhoto);

//DELETE -/ENTRIES/:id/photos/:photoID
//Borra una foto de una entrada
app.delete("/entries/:id/photos/:photoID", entryExists, deleteEntryPhoto);

//POST -/entries/:id/votes
// vota una entrada
app.post("/entries/:id/votes", isUser, entryExists, voteEntry);

/*
        Rutas de Usuarios
*/
//POST -/users
//Registra un nuevo usuario(sin validar)
app.post("/users", newUser);

//GET -/users/validate/:registrationCode
//Registra un usuario que se acaba de registrar
app.get("/users/validate/:registrationCode", validateUser);

//POST -/ users/login
//Hace login de un usuario
app.post("/users/login", loginUser);

//GET -/users/:id
//Muestra info usuarios
app.get("/users/:id", isUser, userExists, getUser);

//DELETE -/users/:id
//Oculta un usuario
app.delete("/users/:id", isUser, userExists, deleteUser);

//PUT -/users/:id
//Edita los datos de un usuario
app.put("/users/:id", isUser, userExists, editUser);

//PUT -/users/:id/password
//Edita la contraseña de un usuario
app.put("/users/:id/password", isUser, userExists, editUserPass);

//POST -/users/recoverPassword
//Enviar un correo con el codigo de reseteo de contraseña a un mail
app.post("/users/recover-password", recoverUserPass);

//POST -/users/reset-password
//Cambiar la contraseña de un usuario
app.post("/users/reset-password", resetUserPass);

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
  console.log(`Servidor funcionando en http://localhost:${PORT}🚀🚀`);
});
