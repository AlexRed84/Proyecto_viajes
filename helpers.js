const{ format } = require("date-fns");
const sharp = require("sharp");
const uuid = require("uuid");
const path = require("path");
const { ensureDir } = require("fs-extra");

function formatDateToDB(dateObjet) {

    return format(dateObjet, "yyyy-MM-dd HH:mm:ss")    
}


async function saveImage(imageData){
    //imageData es el objeto con la informacion de la imagen
    const {UPLOADS_DIRECTORY} = process.env;

    const uploadsDir = path.join(__dirname,UPLOADS_DIRECTORY);

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

module.exports = {
    formatDateToDB,
    saveImage,
};