const getDB = require("../../db");

const editUserPass = async (req, res, next) => {
    
    let connection;

    try {
        connection = await getDB();

        //Recoger de req.params el id de usuario al que tengo que cambiar la contraseña.
        const { id } = req.params;

        //Recoger de req.body la anterior contraseña
        const { oldPassword, newPassword } = req.body;

        //Comprobamos que la nueva contraseña tenga al menos 8 caracteres
        if(newPassword.length < 8) {
            const error = new Error("La nueva contraseña es muy corta ");
            error.httpStatus = 400;
            throw error;
        }

        //Comprobar que el usuario que viene del token es el mismo al que queremos cambiar la pass
        if(req.userAuth.id !== Number(id)) {
            const error = new Error("No tienes permisos para cambiar la contraseña de este usuario");
            error.httpStatus = 403;
            throw error;
        }
        //Comprobar que la pass antigua es correcta
        const [current] = await connection.query(
            `
            SELECT id
            FROM users
            WHERE id=? AND password=SHA2(?,512)
            
            `,
            [id, oldPassword]
            );

            if(current.length === 0) {
                const error = new Error("La contraseña antigua no es correcta");
                error.httpStatus = 401;
                throw error;
            }


        //Guardar la nueva contraseña
        await connection.query(
            `
            UPDATE users
            SET password=SHA2(?, 512), lastAuthUpdate=?
            WHERE id=?
            `,
            [newPassword, new Date(), id]
            );

            //Envia mensaje
        res.send({
            status:"ok",
            message: "Contraseña Cambiada",
        });
        
    } catch (error) {
        next(error);
        
    }finally {
        if(connection)connection.release();
    }

};

module.exports = editUserPass;
