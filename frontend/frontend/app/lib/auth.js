const API_BASE = "http://localhost:4000/api";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (email, password, name) => {
  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password, name }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
