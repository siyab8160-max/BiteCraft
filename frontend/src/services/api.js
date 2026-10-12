const API_URL = import.meta.env.VITE_API_URL;

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && {
        Authorization: `Bearer ${token}`
      })
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
};

export default apiRequest;