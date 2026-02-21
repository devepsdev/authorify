import axios from "axios";

const URL_API = "/api/authentify/user/";

export const loginUser = async (username, password) => {
  const response = await axios.post(`${URL_API}login`, {
    username,
    password,
  });
  return response.data;
};

export const getAllUsers = async (token) => {
  const response = await axios.get(URL_API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteUser = async (id, token) => {
  await axios.delete(`${URL_API}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = async (id, data, token) => {
  await axios.put(`${URL_API}${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = async (data, token) => {
  await axios.post(URL_API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkUsernameExists = async (username, token) => {
  const response = await axios.get(`${URL_API}exists/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
