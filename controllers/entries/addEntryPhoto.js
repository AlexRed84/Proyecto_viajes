const getDB = require("../../db");
const {savedPhoto, formatDateToDB} = require("../../helpers");

const addEntryPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const {id} = req.params;
        //miro cuantas fotos tiene la entrada actualmente
        const [currentPhotos] = await connection.query(
            `
            SELECT id FROM entries_photos WHERE entry_id=?

            `,
            [id]
            );

            //si tiene 3 o mas fotos lanzo un error.
            if(currentPhotos.lenght >= 3) {
                const error = new Error("No puedes subir mas fotos a esta entrada, ya tiene 3");
                error.httpStatus = 403;
                throw error;
            }


            if (req.files && req.files.photo) {
                //guardo la foto en el disco y saco el nombre con el que la guarde
                const savePhoto = await savedPhoto(req.files.photo);
                
                const now = new Date();
                //meto en la tabla de entries_photos una nueva entrada
                await connection.query(
                    `
                    INSERT INTO entries_photos(uploadDate, photo, entry_id)
                    VALUES (?, ?,?)

                    `,
                    [formatDateToDB(now), savePhoto, id]
                    );
                

            }
        res.send({
            status:"ok",
            message: "Nueva foto subida"
        });

    } catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }

}

module.exports = addEntryPhoto;