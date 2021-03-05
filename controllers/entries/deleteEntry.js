const getDB = require('../../db');
const {deletePhoto} = require("../../helpers");

const deleteEntry = async (req, res, next) =>  {
    let connection;

    try {
        connection = await getDB();

        const { id } = req.params;

        //Comprobar que la entrada existe 
        const [current] = await connection.query(`SELECT id FROM entries WHERE id=?
        `, 
        [id]);
            
            //si no existe devolver un 404
        if (current.lenght === 0) {
            const error = new Error(
                "No existe ninguna entrada en la base de datos con ese id"
            );
            error.httpStatus = 404;
            throw error;
        }
        
        //Seleccionar las fotos relacionadas y borrar los ficheros de disco
            const [photos] = await connection.query(`SELECT photo FROM entries_photos WHERE entry_id=?
            `,
             [id]);
                    
        //Borrar las posibles photos de la tabla entries_photos 
            await connection.query(`DELETE FROM entries_photos WHERE entry_id=?
            `,
             [id]);

            //y del disco
            for(const item of photos) {
                await deletePhoto(item.photo);
            }
        
        // En el futuro borrar las posibles votos de la tabla entries_votes

            await connection.query(`DELETE FROM entries_votes WHERE entry_id=?
            `,
            [id]);
        
        //Borrar la entrada de la tabla entries

            await connection.query(`DELETE FROM entries WHERE id=?
            `,
            [id]);

        //Mandar confirmacion


        res.send({
            status: "Ok",
            message: `la entrada con id ${id} y todos sus elementos relacionados fueron borrados del sistema`,
        });
        
    } catch (error) {
        next(error);
        
    }finally{
        if(connection) connection.release();
    }

}; 

module.exports = deleteEntry;