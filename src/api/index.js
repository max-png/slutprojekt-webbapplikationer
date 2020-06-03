async function authorizeUser(payload) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": "3495"
        },
        body: JSON.stringify({ "email": payload.email, "password": payload.password })
    };


    const response = await fetch('http://localhost:5000/api/auth/', requestOptions);
    const data = await response.json();

    if (response.statusText == "OK") {
        return data;
    }
    else(alert("no"))
}

export { authorizeUser }