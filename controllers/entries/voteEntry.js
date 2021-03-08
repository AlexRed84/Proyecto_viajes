const getDb = require("../../db");
//const {formatDateToDB} = require("../../helpers");

const voteEntry = async (req, res, next) => {
    let connection;

    try {
        connection = await getDb();
        //recojo los parametros
        const {id} = req.params;
        const {vote}= req.body;
        //compruebo que el valor de votos este en rango
        if(vote < 1 || vote > 5) {
            const error = new Error("El voto debe estar entre 1 y 5");
            error.httpStatus = 400;
            throw error;
        }

        const now = new Date();
        //añado el voto a la tabla
        await connection.query(
            `
            INSERT INTO entries_votes(date,vote, entry_id)
            VALUE(?, ?, ?)
            `,
            [now, vote, id]
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