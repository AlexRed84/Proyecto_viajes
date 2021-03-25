const getDB = require("../../db");
const { savedPhoto, generateRandomString, sendMail } = require("../../helpers");

const editUser = async (req, res, next) => {
    
    let connection;

    try {
        connection = await getDB();

        //cosas que podemos editar: email, nombre , avatar
        //Sacar id de req.params
        const { id } = req.params; // id del usuario a editar

        //Sacar name y email de req.body
        const { name, email } = req.body;

        //Comprobar que el usuario que queremos editar es el mismo del token o somos administradores
        if(req.userAuth.id !== Number(id) && req.userAuth.role !== "admin") {
            const error = new Error("No tienes permisos para editar este usuario");
            error.httpStatus = 403;
            throw error;
        }

        //Sacar la info actual del usuario en la bbdd
        const [currentUser] = await connection.query(
        
        `
        SELECT email
        FROM users
        WHERE id=?    

        `,
        [id]
        );
        
        
        if(req.files && req.files.avatar) {
        //se esta subiendo un avatar
        const userAvatar = await savedPhoto(req.files.avatar);

        await connection.query(
            `
            UPDATE users
            SET avatar=?
            WHERE id=?
            `,
            [userAvatar, id]
            );

        } 

        // Si el mail enviado es diferente al de la base de datos procesar el nuevo mail
        if(email && email !== currentUser[0].email) {
        //comprobar que no exista otro usuario con ese mail
        const [existingEmail] = await connection.query(
        `
        SELECT id
        FROM users
        WHERE email=?
        `,
        [email]
        );    

        if(existingEmail.length > 0) {
            const error = new Error("Ya existe un usuario con ese email");
            error.httpStatus = 409;
            throw error;
        }
        //Creo un codigo de registro temporal de un solo uso
        const registrationCode = generateRandomString(40);

        //Mando un mail al usuario con link de confirmacion
        const emailBody = 
        `
        Acabas de modificar tu email en la app Roling Road.
        Pulsa en este link para validar tu nuevo email: ${process.env.PUBLIC_HOST}/users/validate/${registrationCode}
        `;

        await sendMail({
            to:email,
            subject:"Confirma tu nuevo Email",
            body: emailBody,
        });

        //Actualizar los datos finales
        await connection.query(
            `
            UPDATE users
            SET name=?, email=?, avatar=?, lastAuthUpdate=?, active=0, registrationCode=?
            WHERE id=?

            `,
            [name, email, new Date(),registrationCode, id]
            );
        //Dar una respuesta
        res.send({
            status:"ok",
            message: "Datos de usuario Actualizados, mira tu email para validar ",
        });

        }else { 
            await connection.query(
                `
                UPDATE users
                SET name=?, email=?
                WHERE id=?
                `,
                [name, email, id]
                );
                res.send({
                    status:"ok",
                    message:"Datos de usuario actualizado"
                });                

        }
        
    } catch (error) {
        next(error);
        
    }finally {
        if(connection)connection.release();
    }

};

module.exports = editUser;