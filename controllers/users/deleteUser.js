const getDB = require("../../db");
const {generateRandomString} = require("../../helpers");

const deleteUser = async (req, res, next) => {
    
    let connection;

    try {
        connection = await getDB();

        //Sacamos de req.pararms el id de usuario que queremos eliminar
        const {id} = req.params;

        //Si la id es igual a 1 dará error
        if(Number(id) === 1) {
            const error = new Error ("El administrador principar no se puede borrar");
            error.httpStatus = 403;
            throw error;
        }

        //Si el usuario no es admin o el usuario a eliminar salta error
        if(req.userAuth.id !== Number(id) && req.userAuth.role !== "admin") {
            const error = new Error ("No tienes permisos para eliminar este usuario");
            error.httpStatus = 401;
            throw error;
        }

        //Hacemos update de la tabla de usuarios
        //cambiar el mail, cambiar pass,borrar nombre, borrar avatar, no activo,
        await connection.query(
            `
            UPDATE users
            SET password=?, name="[borrado]", active=0, deleted=1,lastAuthUpdate=?
            WHERE id=?

            `,
            [generateRandomString(40),new Date(),id]
            );


        //Devolver una respuesta

        res.send({
            status:"ok",
            message: `El usuario con id:${id} fue eliminado`,
        });
        
    } catch (error) {
        next(error);
        
    }finally {
        if(connection)connection.release();
    }

};

module.exports = deleteUser;