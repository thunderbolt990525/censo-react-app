const API_BASE_URL = "https://censo.develotion.com"; // Reemplaza esto con la URL base de tu API

export const login = (account) =>
  fetch(`${API_BASE_URL}/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

export const registro = (account) =>
  fetch(`${API_BASE_URL}/usuarios.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });

export const getDepartments = (apikey, iduser) =>
  fetch(`${API_BASE_URL}/departamentos.php`, {
    headers: {
      "Content-Type": "application/json",
      apikey,
      iduser,
    },
  });

export const getCitiesByDepartment = (apikey, iduser, departmentId) =>
  fetch(
    `${API_BASE_URL}/ciudades.php?idDepartment=${departmentId}`,
    {
      headers: {
        "Content-Type": "application/json",
        apikey,
        iduser,
      },
    }
  );

export const getCities = (apikey, iduser) =>
  fetch(`${API_BASE_URL}/ciudades.php`, {
    headers: {
      "Content-Type": "application/json",
      apikey,
      iduser,
    },
  });

export const getPeoples = (apikey, iduser, idpeople) =>
  fetch(`${API_BASE_URL}/personas.php?idUsuario=${idpeople}`, {
    headers: {
      "Content-Type": "application/json",
      apikey,
      iduser,
    },
  });

export const addPeople = (apikey, iduser, people) =>
  fetch(`${API_BASE_URL}/personas.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey,
      iduser,
    },
    body: JSON.stringify(people),
  });

export const deletePeople = (apikey, iduser, idCensus) =>
  fetch(`${API_BASE_URL}/personas.php?idCenso=${idCensus}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      apikey,
      iduser,
    },
  });

export const getOccupations = (apikey, iduser) =>
  fetch(`${API_BASE_URL}/ocupaciones.php`, {
    headers: {
      "Content-Type": "application/json",
      apikey,
      iduser,
    },
  });

export const getTotalCensus = (apikey, iduser) =>
  fetch(`${API_BASE_URL}/totalCensados.php`, {
    headers: {
      "Content-Type": "application/json",
      apikey,
      iduser,
    },
  });
