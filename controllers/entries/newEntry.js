const getDB = require('../../db');
const { formatDateToDB } = require("../../helpers");

const newEntry = async (req, res, next) => {
let connection;

try {
    //saco los campos necesarios de req.body
    connection = await getDB();
        
    const{ place, description } = req.body;

    console.log(req.body);
    console.log(req.files);

    //si el campo place(unico obligatorio)no existe lanzo un error de bad request
    if(!place){
        const error = new Error("El campo 'place' es obligatorio"); 
        error.httpStatus = 400;
        throw error;
    }
    //creo un objeto con la fecha actual
    const now = new Date();
    //ejecuto la insercion en la base de datos
    const [result] = await connection.query(
        `
        INSERT INTO entries (date, place, description)
        VALUES(?, ?, ?);
        
        `,
        [formatDateToDB(now), place, description]
    );
        //saco la id de la fila insertada
    const {insertId} = result;

        //Procesar las imagenes
        if(req.files)


        //devuelvo en data un objeto que representa lo que acabo de insertar en la bbdd
    res.send({
       status:"ok",
       data: {
           id: insertId,
           place,
           date:now,
           description,
           votes:0,

       },
    });
} catch (error) {
    next(error);
    
}finally{
    if(connection) connection.release();

}
};

module.exports = newEntry;