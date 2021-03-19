const getDB = require("../../db");

const validateUser = async (req, res, next) => {
    
    let connection;

    try {
        connection = await getDB();

        const { registrationCode } = req.params;

        //Comprobar que hay un usuario en la base de datos pendiente de validar con ese codigo

        const [user] = await connection.query(
            
            `
            SELECT id
            FROM users
            WHERE registrationCode=?
            `,
            [registrationCode]
        );

        // Y si no lo hay dar un error

        if(user.length === 0) {
            const error = new Error("No hay ningùn usuario pendiente de validar con ese código");
            error.httpStatus = 404;
            throw error;
        }


        //Activar el usuario y quitarle el registrationCode

        await connection.query (
            `
            UPDATE users
            SET active=true, registrationCode=NULL
            WHERE registrationCode=? 
            `,
            [registrationCode]
        );

            
        //Devolver una respuesta
        
        res.send({
            status:"ok",
            message: "Usuario Validado",
        });
        
    } catch (error) {
        next(error);
        
    }finally {
        if(connection)connection.release();
    }

};

module.exports = validateUser;