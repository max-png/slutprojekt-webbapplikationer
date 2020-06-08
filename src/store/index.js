import Vue from "vue";
import Vuex from "vuex";

import API from "@/api/server";
import * as APIauth from "@/api/server/auth";
import account from "@/store/modules/account.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],

    orderHistory: [],

    totalOrderQuantity: 0,
    totalOrderAmount: 0,

    showCart: false,
    showLogin: false,

    newProduct: {
      title: "Roberts produkt",
      price: 123,
      shortDesc: "Unisex",
      longDesc:
        "kalle NY ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
      imgFile: "skateboard-generic.png",
    },
    updatedProduct: {
      title: "uppdtaerad produkt",
      price: 123,
      shortDesc: "Unisex",
      longDesc:
        "kalle uppdaterad ipsum dolor sit amet, 50-50 Sidewalk Surfer nose bump kickflip bruised heel fakie berm soul skate. Bluntslide transition nollie hard flip bank pressure flip ho-ho. Steps rip grip nosepicker roll-in yeah 540 pump. ",
      imgFile: "skateboard-generic.png",
    },
    currentUser: "",
    userToken: "",
  },
  mutations: {
    addProductToCart(state, orderArticle) {
      const currIndex = state.cart.findIndex(
        (product) => product._id == orderArticle._id
      );
      if (currIndex == -1) {
        orderArticle.quantity = 1;
        state.cart.push(orderArticle);
      } else {
        state.cart[currIndex].quantity += 1;
      }
      state.totalOrderQuantity += 1;
      state.totalOrderAmount += orderArticle.price;
    },
    reduceQuantOrderProd(state, orderArticle) {
      if (orderArticle.quantity <= 1) {
        orderArticle.quantity = 0;
        state.cart = state.cart.filter(
          (article) => article._id != orderArticle._id
        );
      } else {
        orderArticle.quantity -= 1;
      }
      state.totalOrderQuantity -= 1;
      state.totalOrderAmount -= orderArticle.price;
    },
    increaseQuantOrderProd(state, orderArticle) {
      orderArticle.quantity += 1;
      state.totalOrderQuantity += 1;
      state.totalOrderAmount += orderArticle.price;
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    toggleLogin(state) {
      state.showLogin = !state.showLogin;
    },
    setToken(state, token) {
      state.userToken = token;
      localStorage.userToken = JSON.stringify(token);
      console.log("userToken: " + state.userToken);
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
      state.showLogin = false;
      localStorage.currentUser = JSON.stringify(user);
    },
    logout(state) {
      (state.currentUser = ""),
        (state.userToken = ""),
        localStorage.removeItem("currentUser"),
        localStorage.removeItem("userToken");
    },
    clearCart(state) {
      state.cart = [];
      state.totalOrderAmount = 0;
      state.totalOrderQuantity = 0;
    },
    setStoreProducts(state, newProductList) {
      state.products = newProductList;
    },
    removeProductFromStateProductsById(state, productId) {
      state.products = state.products.filter(
        (product) => product._id != productId
      );
    },
    setStoreOrderHistory(state, newOrderHistory) {
      state.orderHistory = newOrderHistory;
    },
    addOrderToStoreOrderHistory(state, newOrder) {
      state.orderHistory.push(newOrder);
    },
    addProductToStoreProducts(state, newProduct) {
      state.products.push(newProduct);
    },
    updateProductInStoreProducts(state, updatedProduct) {
      let index = state.products.findIndex(product => product._id == updatedProduct._id);
      if (index != -1) {
        state.products[index] = updatedProduct
      }
    },
  },
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },
  },
  actions: {
    async initialProductLoad(context) {
      if (context.state.products.length <= 0) {
        await context.dispatch("refreshProducts");
      }
    },
    async refreshProducts(context) {
      const newProductList = await API.fetchProducts(context.state.userToken);
      context.commit("setStoreProducts", newProductList);
    },
    async registerNewProduct(context, newProduct) {
      const addedProduct = await API.postProductRequest(
        newProduct,
        context.state.userToken
      );
      if (addedProduct) {
        context.commit("addProductToStoreProducts", addedProduct);
      }
    },
    async getProductById(context, productId) {
      const fetchedProduct = await API.fetchProductById(productId);
      return fetchedProduct;
    },
    async deleteProductById(context, productId) {
      await API.deleteProductById(productId, context.state.userToken);
      context.commit("removeProductFromStateProductsById", productId);
    },
    async registerNewOrder(context) {
      if (context.state.cart.length > 0) {
        let orderRequestBody = {
          items: [],
        };
        context.state.cart.forEach((cartArticle) => {
          let orderItem = {};
          orderItem.id = cartArticle._id;
          orderItem.quantity = cartArticle.quantity;
          orderRequestBody.items.push(orderItem);
        });
        await API.postOrderRequest(orderRequestBody, context.state.userToken);
        context.commit("clearCart");
        await context.dispatch("refreshOrderHistory");
      } else {
        console.log("Attempt to place order, but cart is empty");
      }
    },
    async refreshOrderHistory(context) {
      const fetchedOrderHistory = await API.fetchOrders(
        context.state.userToken
      );

      context.commit("setStoreOrderHistory", fetchedOrderHistory);
    },
    async updateProduct(context, productToUpdate) {
      console.log(productToUpdate._id);
      const updatedProduct = await API.postUpdateProductByIdRequest(
        productToUpdate,
        context.state.userToken
      );
      console.log(updatedProduct);
      context.commit("updateProductInStoreProducts", productToUpdate)
    },
    async loginUser(context, payload) {
      const data = await APIauth.authorizeUser(payload);
      if (data) {
        context.commit("setToken", data.token);
        context.commit("setCurrentUser", data.user);
      }
    },
    async createNewUser(context, payload) {
      const data = await APIauth.createNewUser(payload);
      if (data) {
        context.dispatch("loginUser", {
          email: payload.email,
          password: payload.password,
        });
        // context.commit("setToken", data.token);
        // context.commit("setCurrentUser", data.user);
      }
    },
    logout(context) {
      context.commit("logout");
    },
  },

  modules: { account },
});
