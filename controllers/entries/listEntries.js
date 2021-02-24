const getDB = require('../../db');

const listEntries =  async (req, res, next) => {
    let connection;
    
    try {
        connection = await getDB();

        //saco querystring
        const { search } = req.query;

        let results;

        if(search) {
            [results] = await connection.query (`
            SELECT entries.id, entries.place, entries.date, avg(IFNULL(entries_votes.vote,0)) AS votes
            FROM entries LEFT JOIN entries_votes ON (entries.id = entries_votes.entry_id)
            WHERE entries.place LIKE ? OR entries.description LIKE ?
            GROUP BY entries.id, entries.place, entries.date ORDER BY votes DESC;
            `,
            [`%${search}%`, `%${search}%`] 
            ); 

        }else {

            //leo las entradas de la base de datos
            [results] = await connection.query (`
                SELECT entries.id, entries.place, entries.date, avg(IFNULL(entries_votes.vote,0)) AS votes
                FROM entries LEFT JOIN entries_votes ON (entries.id = entries_votes.entry_id)
                GROUP BY entries.id, entries.place, entries.date ORDER BY votes DESC;
            `);
        }

       

       
        //devuelvo un json con las entradas
        res.send({
            status: "ok",
            data: results,
        });

        
    } catch (error) {
        next(error);
        
    } finally {
        if (connection) connection.release();

    }

    res.send({
        message:"Listar entradas",
    });
};

module.exports = listEntries;