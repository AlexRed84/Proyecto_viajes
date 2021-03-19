//const { photos } = require('faker');
const getDB = require('../../db');
const { formatDateToDB,  savedPhoto, validate } = require("../../helpers");
const { newEntrySchema } = require("../../Schemas");

const newEntry = async (req, res, next) => {
let connection;

try {
    //conexion a la bbdd
    connection = await getDB();

    //valido los datos
    await validate(newEntrySchema, req.body);

     //saco los campos necesarios de req.body   
    const{ place, description } = req.body;

    //creo un objeto con la fecha actual
    const now = new Date();
    
    //ejecuto la insercion en la base de datos
    const [result] = await connection.query(
        `
        INSERT INTO entries (date, place, description, user_id)
        VALUES(?, ?, ?, ?);
        
        `,
        [formatDateToDB(now), place, description, req.userAuth.id]
    );
        //saco la id de la fila insertada
    const {insertId} = result;

        //Procesar las imagenes
        const photos = [];

        if(req.files && Object.keys(req.files).length > 0) {
            //hay imagenes
            for (const  photoData of Object.values(req.files).slice(
                0,
                3
            )) {
                
               //Guardar la imagen y conseguir el nombre del fichero
                const photoFile = await savedPhoto(photoData);

                photos.push(photoFile);

               //meter una nueva entrada en la tabla entries_photos
               await connection.query(`
                INSERT INTO entries_photos(uploadDate, photo, entry_id)
                VALUES (?, ?, ?)

               `,[formatDateToDB(now), photoFile,insertId]);
            }
            
        }

        //devuelvo en data un objeto que representa lo que acabo de insertar en la bbdd
    res.send({
       status:"ok",
       data: {
           id: insertId,
           user_id:req.userAuth.id,
           place,
           date:now,
           description,
           votes:0,
           photos,

       },
    });
} catch (error) {
    next(error);
    
}finally{
    if(connection) connection.release();

}
};

module.exports = newEntry;