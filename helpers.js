const{ format } = require("date-fns");
const sharp = require("sharp");
const uuid = require("uuid");
const path = require("path");
const { ensureDir, unlink } = require("fs-extra");
const { fstat } = require("fs");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

//configuro api sendgrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {UPLOADS_DIRECTORY} = process.env;

const uploadsDir = path.join(__dirname,UPLOADS_DIRECTORY);
//Formatea un objeto de fecha a DATETIME de SQL
function formatDateToDB(dateObjet) {

    return format(dateObjet, "yyyy-MM-dd HH:mm:ss")    
}
//borrra un fichero en el directorio de subida
async function deletePhoto(photo) {
   const photoPath = path.join(uploadsDir ,photo);

   await unlink(photoPath);
}
//guarda una foto en upload
async function savedPhoto(imageData){
    //imageData es el objeto con la informacion de la imagen
   


//asegurarse que el directorio de subida de imagenes existe
    await ensureDir(uploadsDir);
//leer la imagen con sharp
    const image = sharp(imageData.data);
//comprobar que la imagen no tenga un tamaño mayor a X pixeles de ancho
    const imageInfo = await image.metadata();
//si es mayor que ese tamaño redimensionarla a ese tamaño
    const IMAGE_MAX_WIDTH = 1000;
    if(imageInfo.width > IMAGE_MAX_WIDTH) {
        image.resize(IMAGE_MAX_WIDTH);
    }

//generar un nombre unico para la imagen

    const savedImageName = `${uuid.v4()}.jpg`;
    
//guardar la imagen en el directorio de subida de imagenes

    await image.toFile(path.join(uploadsDir, savedImageName));

//devolver el nombre del fichero
    return savedImageName;
}
//genera una cadena de caracteres aleatorio
function generateRandomString(length) {
    return crypto.randomBytes(length).toString("hex");
}
async function sendMail({ to, subject, body }) {
    // Instrucciones: https://www.npmjs.com/package/@sendgrid/mail
  
    try {
        const msg = {
        to,
        from: process.env.SENDGRID_FROM, // Use the email address or domain you verified above
        subject,
        text: body,
        html: `
            <div>
                <h1>${subject}</h1>
                <p>${body}</p>
            </div>
        `,
    };

        await sgMail.send(msg);
    }   catch (error) {
        throw new Error("Error enviando mail");
    }
}

async function validate(schema,data) {
    try {
        await schema.validateAsync(data);
    } catch (error) {
        error.httpStatus = 400;
        throw error;
    }
    
}


module.exports = {
    formatDateToDB,
    savedPhoto,
    deletePhoto,
    generateRandomString,
    sendMail,
    validate,
};