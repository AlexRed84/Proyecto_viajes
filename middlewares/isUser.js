const getDB = require("../db");
const jswt = require("jsonwebtoken");

const isUser = async (req, res, next) => {
    let connection;
    try {
    connection = await getDB();    
    
    const { authorization } = req.headers;
    
    //Si authorization esta vacio devuelvo un error
    if(!authorization) {
        const error = new Error("Falta la cabecera de autorizacion");
        error.httpStatus = 401;
        throw error;
    }
    
    //Valido el token y si no es valido devuelvo un error
    let tokenInfo;

    try {
        tokenInfo = jswt.verify(authorization, process.env.SECRET);
    } catch (e) {
        const error = new Error("El token no es valido");
        error.httpStatus = 401;
        throw error;     
    }

    //hacer comprobacion de seguridad extra
    //Slecciona la fecha de ultima actualizacion de email / password del usuario
    const [result] = await connection.query(
        `
        SELECT lastAuthUpdate
        FROM users
        WHERE id=?
        `,
        [tokenInfo.id]
        );

        const lastAuthUpdate = new Date (result[0].lastAuthUpdate);
        const tokenEmissionDate = new Date (tokenInfo.iat * 1000);

        if (tokenEmissionDate < lastAuthUpdate) {
            const error = new Error("El token no es válido");
            error.httpStatus = 401;
            throw error;
        }


    //Inyectamos en la request la informacion del token
    req.userAuth = tokenInfo;


    //Continúo

    next();
    } catch (error) {
        next(error);        
    } finally{
    if(connection) connection.release();

    }
};

module.exports = isUser;