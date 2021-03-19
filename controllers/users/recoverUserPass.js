const getDB = require("../../db");
const { generateRandomString, sendMail } = require("../../helpers");

const recorverUserPass = async (req, res, next) => {
let connection;

try {
    connection = await getDB();

    // Sacar de req.body el email a donde enviar la información de cambio de contraseña
    const { email } = req.body;

    // Si no hay email dar un error
    if (!email) {
    const error = new Error("Faltan campos");
    error.httpStatus = 400;
    throw error;
    }

    // Comprobar que el email existe en la base de datos y si no dar un error
    const [currentEmail] = await connection.query(
    `
    SELECT id
    FROM users
    WHERE email=?
    `,
    [email]
    );

    if (currentEmail.length === 0) {
    const error = new Error("No hay ningún usuario registrado con ese email");
    error.httpStatus = 404;
    throw error;
    }

    // Generar una código de recuperación
    const recorverCode = generateRandomString(20);

    // Enviar por mail el código de recuperación
    // Mando un mail al usuario con el link de confirmación de email
    const emailBody = `
        Se solicitó un cambio de contraseña para el usuario registrado con este email en la app Rodando por la Tierra.
        
        El código de recuperación es: ${recorverCode} 

        Si no fuiste tu el que solicitaste el cambio, por favor ignora este email. Puedes hacer login con tu password habitual.

        Gracias!
    `;

    await connection.query(
    `
    UPDATE users
    SET recoverCode=?
    WHERE email=?
    `,
    [recorverCode, email]
    );

    await sendMail({
    to: email,
    subject: "Cambio de contraseña en Rodando por la Tierra",
    body: emailBody,
    });

    // Dar una respuesta

    res.send({
    status: "ok",
    message: "Email enviado",
    });

} catch (error) {
    next(error);
} finally {
    if (connection) connection.release();
}
};

module.exports = recorverUserPass;