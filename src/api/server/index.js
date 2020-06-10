const api_url = "http://localhost:5000/api";

export default {
  async fetchProducts(token) {
    try {
      let resp = await fetch(api_url + "/products", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      let data = await resp.json();
      return data;
    } catch (error) {
      throw new Error("Connection Error");
    }
  },
  async fetchOrders(token) {
    try {
      let resp = await fetch(api_url + "/orders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (resp.ok) {
        let data = await resp.json();
        return data;
      } else {
        if (resp.status == "401") throw new Error("Unauthorzied");
        else throw new Error("Server Issues");
      }
    } catch (error) {
      throw new Error("Connection Error");
    }
  },
  async postOrderRequest(orderRequestBody, token) {
    try {
      const RequestBody = JSON.stringify(orderRequestBody);
      console.log(RequestBody);
      let resp = await fetch(api_url + "/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: RequestBody,
      });
      console.log(resp);
      if (resp.ok) {
        return { status: resp.ok };
      } else {
        if (resp.status == "401") {
          throw new Error("Ej aktoriserad");
        } else if (resp.status == "400") {
          throw new Error("Formatfel i inskickad order.");
        } else if (resp.status != "200") {
          throw new Error("Tyvärr kunde inte ordern läggas. Okänt fel.");
        }
        throw new Error(resp.status);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async postProductRequest(newProduct, token) {
    // let result;
    try {
      const RequestBody = JSON.stringify(newProduct);
      let resp = await fetch(api_url + "/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: RequestBody,
      });
      console.log(resp);
      if (resp.ok) {
        // alert("Du är inte inloggad som admin");
        const data = await resp.json();
        return data.product;
      } else {
        let msg = "";
        if (resp.status == "401") {
          msg = "Unauthorized";
        } else {
          msg = resp.status;
        }
        throw new Error(msg);
        // console.log(resp)
        // return { success: resp.ok, data: undefined, errorMessage: "Unauthorized" }
      }
    } catch (error) {
      //WHAT WEE WANT TO DO UPON NETWORK ERROR....
      // return { success: false, data: undefined, errorMessage: "Connection Error" }
      throw new Error(error);
    }
  },

  async deleteProductById(productId, token) {
    let resp = await fetch(api_url + "/products/" + productId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (resp.ok) {
      return;
    } else {
      let msg = "";
      if (resp.status == "401") {
        msg = "Unauthorized";
      } else {
        msg = resp.status;
      }
      // console.log(1);
      // console.error(msg);
      throw new Error(msg);
    }
  },
  async fetchProductById(productId) {
    let resp = await fetch(api_url + "/products/" + productId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await resp.error);
    if (resp.ok) {
      //   alert("Hittade ingen produkt med ID: " + productId);
      const data = await resp.json();
      return data;
    } else {
      let msg = "";
      if (resp.status == "401") {
        msg = "Unauthorized";
      } else if (resp.status == "404") {
        msg = "Resource missing";
      } else {
        msg = resp.status;
      }
      throw new Error(msg);
    }
  },

  async postUpdateProductByIdRequest(updatedProduct, token) {
    let productId = updatedProduct._id;
    const RequestBody = JSON.stringify(updatedProduct);
    console.log(RequestBody);
    let resp = await fetch(api_url + "/products/" + productId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: RequestBody,
    });
    if (resp.ok) {
      return resp.json();
    } else if (resp.status == "401") {
      throw new Error("Unauthorized");
    } else if (resp.status == "404") {
      throw new Error("Bad URI");
    } else {
      throw new Error("Server Issues");
    }
  },
};
