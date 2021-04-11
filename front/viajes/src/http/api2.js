const apiUrl = 'http://localhost:3000';

const requestMethods = { post: 'POST', get: 'GET', put: 'PUT', delete: 'DELETE' };

const endPoints = {
  login: '/users/login',
  registro: '/users/',
  recoverPass: '/users/recover-password',
  resetPass: '/users/reset-password',
  updateInfo: '/users',
  getRoute: '/entries',
  newRoute: '/entries',
};
async function fetchFormData(path, { body, method }) {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  const headers = new Headers();
  headers.append('Authorization', token);

  return await fetch(`${apiUrl}${path}`, { method, headers, body });
}

async function fetchb2bApi(path, { body, method }) {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (token) {
    headers.append('Authorization', token);
  }
  const request = await fetch(`${apiUrl}${path}`, { headers: headers, method: method, body: JSON.stringify(body) });
  const requestData = await request.json();
  if (requestData.status === 'error') {
    throw requestData.message;
  }
  return requestData;
}
export async function updateInfo(data, id) {
  const body = new FormData();
  body.append('name', data.nombre);
  body.append('email', data.email);
  body.append('description', data.description);
  body.append('photo', data.foto[0]);
  return await fetchFormData(`/users/${id}`, {
    method: requestMethods.put,
    body,
  });
}
export async function getRoute() {
  return await fetchb2bApi(`/entries`, {
    method: requestMethods.get,
  });
}
export async function getRouteInfo(id) {
  const data = await fetchb2bApi(`/entries/${id}`, {
    method: requestMethods.get,
  });
  return data;
}
export async function modifyRoute(id, data) {
  const body = new FormData();
  body.append('name', data.nombre);
  body.append('location', data.city);
  body.append('description', data.bio);
  body.append('category', data.category);
  body.append('photo', data.foto[0]);
  const message = await fetchFormData(`/entries/${id}`, {
    method: requestMethods.put,
    body,
  });
  console.log(message);
  return message;
}
export async function deleteRoute(id) {
  console.log(id);
  const path = `/entries/${id}`;
  console.log(path);
  await fetchb2bApi(path, {
    method: requestMethods.delete,
  });
}
export async function login(email, password) {
  const tokenData = await fetchb2bApi(endPoints.login, {
    method: requestMethods.post,
    body: { email, password },
  });
  const token = tokenData.data.token;
  localStorage.setItem('token', token);
  return token;
}
export async function recover(email) {
  return await fetchb2bApi(endPoints.recoverPass, {
    method: requestMethods.post,
    body: { email },
  });
}
export async function getUserInfo(id) {
  const userDat = await fetchb2bApi(`/users/${id}`, {
    method: requestMethods.get,
  });
  return userDat;
}
export async function validateUser(codigo) {
  const message = await fetchb2bApi(`/users/validate/${codigo}`, {
    method: requestMethods.get,
  });
  console.log(message);
  return message;
}
// export async function newRoute(data) {
//   const body = new FormData();
//   body.append('place', data.place);
//   body.append('description', data.description);
//   body.append('photo', data.photo[0]);
//   return await fetchb2bApi(`/entries/`, {
//     method: requestMethods.post,
//     body: body,
//   });
// }
export async function getRoutePosted(id) {
  const userDat = await fetchb2bApi(`/entries/${id}`, {
    method: requestMethods.get,
  });
  console.log(userDat);
  return userDat;
}
export async function getListEntries() {
  const userDat = await fetchb2bApi(`/entries`, {
    method: requestMethods.get,
  });
  console.log(userDat);
  return userDat;
}
export async function resetPass(recoverCode, newPassword, confirmPass) {
  return await fetchb2bApi(endPoints.resetPass, {
    method: requestMethods.post,
    body: {
      recoverCode,
      newPassword,
      confirmPass,
    },
  });
}
export async function signUpApi(email, password, confirmPassword) {
  return await fetchb2bApi(endPoints.registro, {
    method: requestMethods.post,
    body: {
      email,
      password,
      confirmPassword,
    },
  });
}
