const API_URL = "/api";

export const apiCall = async (path, method, data, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.authorization = `Bearer ${token}`;
  let body = undefined;
  if (method !== "GET" && data) body = JSON.stringify(data);
  try {
    const response = await fetch(`${API_URL}/${path}`, {
      method,
      body,
      headers,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw Error(err);
  }
};
