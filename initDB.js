const { query } = require('express');
const faker = require('faker');
const {random} = require('lodash');
const getDB = require("./db");
const { formatDateToDB } = require('./helpers.js');

let connection;

async function main() {
    try {
      connection = await getDB();

        //borrar tablas existentes
      await connection.query("DROP TABLE IF EXISTS entries");
      await connection.query("DROP TABLE IF EXISTS entries_photos");
      await connection.query("DROP TABLE IF EXISTS entries_votes");

      console.log("Tablas Borradas");

        //Crear Tabla entries
        await connection.query(
            `CREATE TABLE entries (
                id INT PRIMARY KEY AUTO_INCREMENT,
                date DATETIME NOT NULL,
                place VARCHAR(100) NOT NULL,
                description TEXT
            );
        
        `);

        //Crear tabla entries_photos
        await connection.query(`
              CREATE TABLE entries_photos (
                  id INT PRIMARY KEY AUTO_INCREMENT,
                  uploadDate DATETIME NOT NULL,
                  photo VARCHAR(50) NOT NULL,
                  entry_id INT NOT NULL
             );
         `);

         
        //Crear la tabla entries_votes
        await connection.query(`
            CREATE TABLE entries_votes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                date DATETIME NOT NULL,
                vote TINYINT NOT NULL,
                entry_id INT NOT NULL,
                CONSTRAINT entries_votes_CK1 CHECK (vote IN (1,2,3,4,5))

            );

        `);


            console.log("Nuevas tablas creadas");

            //Introducir datos iniciales de prueba

            //Introducir varias entradas
            const entries =10;

            for (let index = 0; index < entries; index++){
                const now = new Date();

                await connection.query(`
                INSERT INTO entries(date, place, description)
                VALUES ("${formatDateToDB(now)}","${faker.address.city()}","${faker.lorem.paragraph()}")
                
                `);
            }
            console.log("Datos de prueba introducidos en entries");

           
            // Introducir varios votos
                const votes = 100;

                for(let index = 0; index < votes; index++){
                    const now = new Date();

                    await connection.query(`
                        INSERT INTO entries_votes(date, vote, entry_id)
                        VALUES("${formatDateToDB(now)}",${random(1, 5)},${random(1, 10)})
                    `);
                }
                console.log("Datos de prueba introducidos en entries_votes");

    } catch (error) {
        console.error(error);
    } finally {
        //libera la conexion
      if(connection) connection.release();
      process.exit();
    }
}

main();