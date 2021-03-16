const getDB = require("../../db");

const resetUserPass = async (req, res, next) => {
let connection;

try {
    connection = await getDB();

    // Sacar de req.body los campos recoverCode y newPassword
    const { recoverCode, newPassword } = req.body;

    // Si alguno de eses campos está vacío devolver un error
    if (!recoverCode || !newPassword || newPassword.length < 8) {
    const error = new Error(
        "Faltan campos o la nueva contraseña es muy corta"
    );
    error.httpStatus = 400;
    throw error;
    }

    // Comprobar que existe un usuario en la base de datos con ese código de recuperación activo
    const [user] = await connection.query(
    `
    SELECT id
    FROM users
    WHERE recoverCode=?
    `,
    [recoverCode]
    );

    // Si no lo hay devolver un error
    if (user.length === 0) {
    const error = new Error("Código de recuperación incorrecto");
    error.httpStatus = 404;
    throw error;
    }

    // Establecer la contraseña proporcionada a ese usuario
    await connection.query(
    `
    UPDATE users
    SET password=SHA2(?, 512), lastAuthUpdate=?, recoverCode=NULL
    WHERE id=?
    `,
    [newPassword, new Date(), user[0].id]
    );

    // Devolver una response

    res.send({
    status: "ok",
    message: "Password del usuario cambiada",
    });
} catch (error) {
    next(error);
} finally {
    if (connection) connection.release();
}
};

module.exports = resetUserPass;