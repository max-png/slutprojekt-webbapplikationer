async function authorizeUser(payload) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "3495",
    },
    body: JSON.stringify({ email: payload.email, password: payload.password }),
  };
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/",
      requestOptions
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
}

async function createNewUser(payload) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "3495",
    },
    body: JSON.stringify(payload),
  };
  try {
    const response = await fetch(
      "http://localhost:5000/api/register",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Email already in use");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export { authorizeUser, createNewUser };
