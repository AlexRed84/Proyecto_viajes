const apiUrl = 'http://localhost:3000';



async function genericRequest(path, { body, method }) {
    const headers = new Headers({'Content-Type': 'application/json'});  

    const response = await fetch(`${apiUrl}${path}`, {
        method: method,
        headers: headers, 
        body: JSON.stringify(body),
        });
        return response;
    
}
//Con esta funcion hago peticiones de login

export function login(loginData) {
    return genericRequest('/users/login', {
        method: 'POST',
        body: loginData,
    });
}
    
    //Con esta funcion hago peticiones de login

export function register(registerData) {
    return genericRequest('/users', {
        method: 'POST',
        body: register,
    });
}
    