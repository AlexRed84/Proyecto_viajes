const getDB = require('../../db');
const { formatDateToDB } = require("../../helpers");
const {differenceInHours} = require("date-fns");

const editEntry = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { id } = req.params;


        //Seleccionar la entrada de la base de datos para saber quien la creo
        const [current] = await connection.query(
            `
            SELECT date
            FROM entries
            WHERE id=?

            `,
            [id]
            );
        

        //Comprobar que pasaron menos de X horas desde la creacion de la entrada 
        const difference = differenceInHours(new Date(), new Date(current[0].date));

        if(
            difference > Number(process.env.MAX_HOURS_EDIT_MARGIN) &&
            req.userAuth.role !== "admin"
            ) {
            const error = new Error(`Ya pasaron más de ${process.env.MAX_HOURS_EDIT_MARGIN} horas desde la creacion de la entrada. 
            No se puede editar`
            );
            error.httpStatus = 403;
            throw error;
        }

        // //comprobar que existe una entrada con ese id
        // const [current] = await connection.query(
        //     `SELECT id FROM entries WHERE id=?`,
        //     [id]
        //     );
            
        //     //si no existe devolver un 404
        // if (current.length === 0) {
        //     const error = new Error(
        //         "No existe ninguna entrada en la base de datos con ese id"
        //     );
        //     error.statusCode = 404;
        //     throw error;
        // }

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