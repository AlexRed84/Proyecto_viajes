//const { query } = require('express');
require("dotenv").config();
const faker = require("faker");
const { random } = require("lodash");
const getDB = require("./db");
const { formatDateToDB } = require("./helpers.js");

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

    //tabla de usuarios

    await connection.query(`
      CREATE TABLE users (
          id INT PRIMARY KEY AUTO_INCREMENT,
          date DATETIME NOT NULL,
          email VARCHAR(500) UNIQUE NOT NULL,
          password VARCHAR(512) NOT NULL,
          name VARCHAR(100) DEFAULT NULL,
          avatar VARCHAR(50),
          deleted BOOLEAN DEFAULT false,
          active BOOLEAN DEFAULT false,
          role ENUM("admin", "normal") DEFAULT "normal" NOT NULL,
          registrationCode VARCHAR(100),
          lastAuthUpdate DATETIME,
          recoverCode VARCHAR(100)
      )
      
      `);

    //Tabla entradas
    await connection.query(
      `CREATE TABLE entries (
                id INT PRIMARY KEY AUTO_INCREMENT,
                date DATETIME NOT NULL,
                place VARCHAR(100) NOT NULL,
                description TEXT DEFAULT NULL,
                user_id INT NOT NULL
            );
        
        `
    );

    // tabla entradas fotos
    await connection.query(`
              CREATE TABLE entries_photos (
                  id INT PRIMARY KEY AUTO_INCREMENT,
                  uploadDate DATETIME NOT NULL,
                  photo VARCHAR(50) NOT NULL,
                  entry_id INT NOT NULL
            );
        `);

    //tabla entradas votos
    await connection.query(`
            CREATE TABLE entries_votes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                date DATETIME NOT NULL,
                vote TINYINT NOT NULL,
                entry_id INT NOT NULL,
                user_id INT NOT NULL,
                CONSTRAINT entries_votes_CK1 CHECK (vote IN (1,2,3,4,5))
                -- CONSTRAINT uc_user_entry UNIQUE (user_id, entry_id)

            );

        `);

    console.log("Nuevas tablas creadas");

    //Introducir datos iniciales de prueba

    //introducir un usuario administrador
    await connection.query(`
            INSERT INTO users(date, email, password, name, active, role)
            VALUES("${formatDateToDB(new Date())}",
            "laleandro@gmail.com",
            SHA2(${process.env.ADMIN_PASSWORD}, 512),
            "Ale Rojas",
            true,
            "admin");    

            `);

    //introducimos varios usuarios aleatorios

    //   const users = 4;

    //   for(let index = 0; index < users; index++) {

    //     const now = new Date();
    //     const email = faker.internet.email();
    //     const password = faker.internet.password();
    //     const name = faker.name.findName();

    //     await connection.query(`
    //     INSERT INTO users(date, email, password, name, active)
    //     VALUES("${formatDateToDB(now)}","${email}",SHA2("${password}",512),"${name}",true)
    //     `);
    //   }

    //   //Introducir varias entradas
    // const entries =5;

    // for (let index = 0; index < entries; index++){
    //   const now = new Date();

    //     await connection.query(`
    //     INSERT INTO entries(date, place, description, user_id)
    //     VALUES ("${formatDateToDB(now)}","${faker.address.city()}","${faker.lorem.paragraph()}", ${random(
    //       2,
    //       users + 1
    //       )})
    //   `);
    //   }
    //   console.log("Datos de prueba introducidos en Entradas");

    //   // Introducir varios votos
    //     const votes = 50;

    //       for(let index = 0; index < votes; index++){
    //         const now = new Date();

    //           await connection.query(
    //             `
    //               INSERT INTO entries_votes(date, vote, entry_id, user_id)
    //               VALUES("${formatDateToDB(now)}",${random(1, 5)},${random(1, entries)}, ${random(2, users + 1)})

    //             `);
    //       }
    //       console.log("Datos de prueba introducidos en Entrada de Votos");
  } catch (error) {
    console.error(error);
  } finally {
    //libera la conexion
    if (connection) connection.release();
    process.exit();
  }
}

main();
