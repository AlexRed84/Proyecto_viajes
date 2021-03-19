const getDB = require('../../db');


const getEntry = async (req, res, next) => {
    let connection;
    
    try{     
        connection = await getDB();
        //sacao el id de los parametros de ruta
        const { id } = req.params;

        //hago la query

        const [result] = await connection.query(`

        SELECT entries.id, entries.place, entries.date,entries.description,entries.user_id, avg(IFNULL(entries_votes.vote,0)) AS votes
        FROM entries LEFT JOIN entries_votes ON (entries.id = entries_votes.entry_id)
        WHERE entries.id = ?
        `,[id]);

        
        //desestructuro el elemento de los resultados
        const [single] = result;

        if(single.id === null) {
            //el elemento no existe
            const error = new Error("El elemento no existe");
            error.httpStatus = 404;
            throw error;
        }

        //sacamos las fotos de la entrada

        const [photos] = await connection.query(
            `SELECT id, photo, uploadDate FROM entries_photos WHERE entry_id=? 
            `,[id]);
        
        res.send({
            status:"ok",
            data: {
            ...single,
            photos            
            },
                
        });

    }catch (error) {
        next(error);
    }finally{
        if(connection) connection.release();
    }
};

module.exports = getEntry;