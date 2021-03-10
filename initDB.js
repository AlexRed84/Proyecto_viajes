//const { query } = require('express');
require("dotenv").config();
const faker = require('faker');
const { random } = require('lodash');
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
      await connection.query("DROP TABLE IF EXISTS users");
      

      console.log("Tablas Borradas");


      //crear tabla de usuarios

      await connection.query(`
      CREATE TABLE users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          date DATETIME NOT NULL,
          email VARCHAR(500) UNIQUE NOT NULL,
          password VARCHAR(500) NOT NULL,
          name VARCHAR(100),
          avatar VARCHAR(50),
          active BOOLEAN DEFAULT false,
          role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
          registrationCode VARCHAR(100)
      )
      
      `);

        //Crear Tabla entries
        await connection.query(
            `CREATE TABLE entries (
                id INT PRIMARY KEY AUTO_INCREMENT,
                date DATETIME NOT NULL,
                place VARCHAR(100) NOT NULL,
                description TEXT,
                user_id INT NOT NULL
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

            //introducir un usuario administrador
            await connection.query(`
            INSERT INTO users(date, email, password, name, active, role)
            VALUES("${formatDateToDB(new Date())}","laleandro@gmail.com",SHA2(${process.env.ADMIN_PASSWORD}, 512),"Ale Rojas", true, "admin");    

            `);
            

            //introducimos varios usuarios aleatorios

            //Introducir varias entradas
          //  const entries =100;

            //for (let index = 0; index < entries; index++){
              //  const now = new Date();

//                await connection.query(`
  //              INSERT INTO entries(date, place, description)
    //            VALUES ("${formatDateToDB(now)}","${faker.address.city()}","${faker.lorem.paragraph()}")
      //          
        //        `);
          //  }
            //console.log("Datos de prueba introducidos en entries");

           
            // Introducir varios votos
              //  const votes = 500;

                //for(let index = 0; index < votes; index++){
                  //  const now = new Date();

                    //await connection.query(`
                      //  INSERT INTO entries_votes(date, vote, entry_id)
                        //VALUES("${formatDateToDB(now)}",${random(1, 5)},${random(1, entries)})
                   // `);
               // }
                //console.log("Datos de prueba introducidos en entries_votes");

    } catch (error) {
        console.error(error);
    } finally {
        //libera la conexion
      if(connection) connection.release();
      process.exit();
    }
}

main();