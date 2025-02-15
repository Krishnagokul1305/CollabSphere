export async function updateUser(data) {
  try {
    const response = await fetch(`${process.env.API_BASE}/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updatePassword(password, newPassword) {
  try {
    const response = await fetch(
      `${process.env.API_BASE}/users/update-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password, newPassword }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
}
