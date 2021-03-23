//decodificamos la informacion de usuario de un token JWT
export default function decodeToken(token) {
    if (!token) {
        return null;
    }
    //partimos el token por el separador que es el . y pillamos el trozo del medio
    const userDataString = token.split('.')[1];
    //recostruimos el objeto que tiene los datos del usuario
    const userDataDecoded = JSON.parse(atob(userDataString));

    return userDataDecoded;

}