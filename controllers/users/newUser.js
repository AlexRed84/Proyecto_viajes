const getDB = require("../../db");
const {generateRandomString,sendMail} = require("../../helpers");

const newUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //Recojo de req.body el email y la password

        const {email, password} = req.body;

        //Compruebo que no esten vacios

        if(!email || !password) {
            const error = new Error("Faltan campos");
            error.httpStatus = 400;
            throw error;
        }

        //Compruebo que no exista un usuario con ese mail en la BBDD

        const [existingUser] = await connection.query(
        `
        SELECT id
        FROM users
        WHERE email=?

        `,
        [email]
        );

        if(existingUser.length > 0) {
            const error = new Error(
            "Ya hay un usuario en la base de datos con ese email" 
            );
            error.httpStatus = 409;
            throw error;
        }

        //Creo un código de registro (contraseña temporal de un solo uso)
        
        const registrationCode = generateRandomString(40);
                
        //Mando un mail al usuario con el link de confirmacion del mail

        const emailBody = `

        Te acabas de registrar en Atravesando España. 
        Pulsa en este link para validar tu email: ${process.env.PUBLIC_HOST}/users/validate/${registrationCode}
        `;
                
        await sendMail({
            to: email,
            subject: "Activa tu usuario ",
            body: emailBody,
          });
       
        //Meto el usuario en la base datos desactivado y con ese codigo de registro
        
        //Mando una respuesta

        res.send({
            message:"Registra un nuevo usuario",
        });

    } catch (error) {
        next(error);
        
    }finally{
        if(connection) connection.release();
    }
};
module.exports = newUser;