const getDB = require('../../db');
const { formatDateToDB } = require("../../helpers");

const editEntry = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { id } = req.params;

        //comprobar que existe una entrada con ese id
        const [current] = await connection.query(
            `SELECT id FROM entries WHERE id=?`,
            [id]
            );
            
            //si no existe devolver un 404
        if (current.lenght === 0) {
            const error = new Error(
                "No existe ninguna entrada en la base de datos con ese id"
            );
            error.statusCode = 404;
            throw error;
        }

        //comprobar que los datos minimos vienen en el body
        const { date, place, description } = req.body;

        if(!date || !place) {
            const error = new Error("Faltan campos");
            error.httpStatus = 400;
            throw error;
        }

        const dbDate = new Date(date);

        //hacer la query de SQL UPDATE
        await connection.query(
            `UPDATE entries SET date=?, place=?, description=? WHERE id=?`,
        [formatDateToDB(dbDate), place, description, id]
        );

        //Devolver una respuesta

        res.send({

            status:"ok",
            data: {
                id,
                date,
                place,
                description,
            },

        });

    } catch (error) {
        next(error);
    }finally{

        if (connection) connection.release();
    }
};

module.exports = editEntry;