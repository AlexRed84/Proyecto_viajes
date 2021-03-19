const getDB = require("../../db");

const getUser = async (req, res, next) => {
    
    let connection;

    try {
        connection = await getDB();

        //Saco la id de usuario de req.params
        const {id} = req.params;

        //Saco toda la info de usuario
        const [user] = await connection.query(
        `
        SELECT id, date, email, name, avatar, role
        FROM users
        WHERE id=?

        `,
        [id]
        );
        //Creo la respuesta básica
        const userInfo = {
            name: user[0].name,
            avatar: user[0].avatar,
        };

        //Si el usuario coincide con el del token
        if(user[0].id === req.userAuth.id || req.userAuth.role === "admin") {
            userInfo.date = user[0].date;
            userInfo.email = user[0].email;
            userInfo.role = user[0].role;
        }

        //Devuelvo la respuesta

        res.send({
            status:"ok",
            data: userInfo,
        });
        
    } catch (error) {
        next(error);
        
    }finally {
        if(connection)connection.release();
    }

};

module.exports = getUser;