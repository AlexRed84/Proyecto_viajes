const { result } = require('lodash');
const getDB = require('../../db');

const listEntries =  async (req, res, next) => {
    let connection;
    
    try {
        connection = await getDB();

        //saco querystring
        const { search, order, direction } = req.query;

        const validOrderFields = ['place', 'date', 'votes'];
        const validOrderDirection = ["DESC", "ASC"];

        const orderBy = validOrderFields.includes(order) ? order :'votes';
        const orderDirection = validOrderDirection.includes(direction)
        ? direction
        :"ASC";



        let results;

        if(search) {
            [results] = await connection.query (`

            SELECT entries.id, entries.place, entries.date,entries.user_id, AVG(IFNULL(entries_votes.vote,0)) AS votes
            FROM entries 
            LEFT JOIN entries_votes ON (entries.id = entries_votes.entry_id)
            WHERE entries.place LIKE ? OR entries.description LIKE ?
            GROUP BY entries.id, entries.place, entries.date, entries.user_id
            ORDER BY ${orderBy} ${orderDirection};
            `,
            [`%${search}%`, `%${search}%`] 
            ); 

        }else {

            //leo las entradas de la base de datos
            [results] = await connection.query(`

                SELECT entries.id, entries.place, entries.date,entries.user_id, AVG(IFNULL(entries_votes.vote,0)) AS votes
                FROM entries 
                LEFT JOIN entries_votes ON (entries.id = entries_votes.entry_id)
                GROUP BY entries.id, entries.place, entries.date, entries.user_id
                ORDER BY ${orderBy} ${orderDirection};
            `);
        }


        // if (result.length === 0) {
        //     return res.send({
        //         status:"ok",
        //         data: [],
        //     });
        // }

        let resultsWithPhotos = []

        if (results.length > 0) {

        //Saco las ids de los resultados

       const ids = results.map((result) => result.id);

       //Selecciono todas las fotos que tengan como entrada selecciona de una id de los resultados anterioros
       const[photos] = await connection.query(
           `
            SELECT * FROM entries_photos WHERE entry_id IN (${ids.join(",")})
           `);
        //Junto en array de fotos resultante en la query anterior con los resultados
        resultsWithPhotos = results.map((result) => {

            //fotos correspondientes al resultado(si hay, si no un array vacio)
            const resultPhotos = photos.filter(
            (photo) => photo.entry_id === result.id
            );

        
     
            //Devuelvo el resultado + el array de fotos

                return {
                    ...result,
                    photos: resultPhotos,
                };

            });  
            
        

        }

       
        //devuelvo un json con las entradas
        res.send({
            status: "ok",
            data: resultsWithPhotos,
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