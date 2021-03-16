const getDb = require("../../db");
//const {formatDateToDB} = require("../../helpers");

const voteEntry = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();
        //recojo los parametros
        const { id } = req.params;
        const { vote }= req.body;
        //compruebo que el valor de votos este en rango
        if(vote < 1 || vote > 5) {
            const error = new Error("El voto debe estar entre 1 y 5");
            error.httpStatus = 400;
            throw error;
        }

        //Compruebo que el usuario no es el creador de la entrada
        const [current] = await connection.query(
            `
            SELECT user_id
            FROM entries
            WHERE id=?
            `,
            [id]
            );

            if(current[0].user_id === req.userAuth.id) {
                const error = new Error("No puedes votar tu propia entrada");
                error.httpStatus = 403;
                throw error;
            }

        //Comprobar que no se vota mas de una vez

        const [existingVote] = await connection.query(
            `
            SELECT id
            FROM entries_votes
            WHERE user_id=? AND entry_id=?
            `,
            [req.userAuth.id, id]
            );
            if(existingVote.length > 0) {
                const error = new Error("Ya votaste esta entrada anteriormente");
                error.httpStatus = 403;
                throw error;
            }


        const now = new Date();

        //añado el voto a la tabla
        await connection.query(
            `
            INSERT INTO entries_votes(date,vote, entry_id, user_id)
            VALUE(?, ?, ?, ?)
            `,
            [now, vote, id, req.userAuth.id]
            );

            //saco la nueva media de votos
        const [newVotes] = await connection.query(
            `
        SELECT AVG(entries_votes.vote) AS votes
        FROM entries LEFT JOIN entries_votes ON (entries.id = entries_votes.entry_id)
        WHERE entries.id = ?
            `,
        [id]
        );
           

        res.send({
            status:"ok",
            data:{
                votes:newVotes[0].votes
            }

        });
        
    } catch (error) {
        next(error);
        
    }finally{
        if(connection)connection.release();
    }
};

module.exports = voteEntry;