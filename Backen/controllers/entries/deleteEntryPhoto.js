const getDB = require("../../db");
const {deletePhoto} = require("../../helpers");

const deleteEntryPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const {id, photoID} = req.params;

        //Selecciono la foto de la base de datos
        const [current] = await connection.query(
            `
            SELECT photo FROM entries_photos
            WHERE id=? AND entry_id=?

            `,
        [photoID, id]
        );

        //si la foto no existe , devuelvo un error
        if(current.length === 0){
            const error = new Error("La foto no existe");
            error.httpStatus = 404;
            throw error;
        }

        
        //borrar la foto de disco
        await deletePhoto(current[0].photo);
        //borrar la foto de BBDD
        await connection.query(
            `
            DELETE FROM entries_photos
            WHERE id=? AND entry_id=?

            `,
            [photoID, id]
            );

        res.send({
            status:"Ok",
            message:"Foto Borrada",
        });
        
    } catch (error) {
        next(error);
        
    }finally{
        if(connection) connection.release();
    }

};

module.exports = deleteEntryPhoto;

