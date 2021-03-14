const getDB = require("../../db");
const jswt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
    
    let connection;

    try {
        connection = await getDB();

        //Recoger el email y password de req.body

        const {email, password} = req.body;

        //Si email o password estàn vacios dar un error

        if(!email || !password) {
            const error = new Error("Faltan campos");
            error.httpStatus = 400;
            throw error;            
        }

        //Seleccionar el usuario de la base de datos con ese mail y password

        const [user] = await connection.query (

            `
            SELECT id, role, active
            FROM users
            WHERE email=? AND password=SHA2(?, 512)

            `,
            [email, password]
        );

        //Si no existe asumimos que el mail o pass son incorrectos y damos error

        if(user.lenght === 0) {
            const error = new Error("El email o la password son incorrectos");
            error.httpStatus = 401;
            throw error;
        }
        //Si existe pero no esta activo avisamos de que esta pendiente de activar

        if(!user[0].active) { // (me da un error, revisar con BERTO)
            const error = new Error(
            "El usuario existe pero esta pendiente de validar.Comprueba tu email.");
            error.httpStatus = 401;
            throw error;
            
        }

        //Asumimos que el login es correcto        
        //Creo el objeto de informacion que irá en el token
        const info = {
            id:user[0].id,
            role:user[0].role,
        };

        const token = jswt.sign(info, process.env.SECRET, {
            expiresIn:"30d",
        });

        
        res.send({
            status:"ok",
            data: {
                token,
            },
        });
        
    } catch (error) {
        next(error);
        
    }finally {
        if(connection)connection.release();
    }

};

module.exports = loginUser;