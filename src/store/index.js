import Vue from "vue";
import Vuex from "vuex";

import API from "@/api/server";
import * as APIauth from "@/api/server/auth";
// import account from "@/store/modules/account.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],

    orderHistory: [],

    totalOrderQuantity: 0,
    totalOrderAmount: 0,

    showModal: false,
    showCart: false,
    showLogin: false,
    error: undefined,
    editProduct: {},

    loading: true,

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
    paymentCard: {
      cardNumber: "5566478865782355",
      cardHolderName: "",
      ValudThru: "1223",
      ccvVode: "456",
    },
  },
  mutations: {
    setCartObjects(state, cartObject) {
      state.cart = cartObject.cart;
      state.totalOrderAmount = cartObject.amount;
      state.totalOrderQuantity = cartObject.quantity;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setEditProduct(state, value) {
      state.editProduct = value;
    },

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
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cart: state.cart,
          quantity: state.totalOrderQuantity,
          amount: state.totalOrderAmount,
        })
      );
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
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cart: state.cart,
          quantity: state.totalOrderQuantity,
          amount: state.totalOrderAmount,
        })
      );
    },
    increaseQuantOrderProd(state, orderArticle) {
      orderArticle.quantity += 1;
      state.totalOrderQuantity += 1;
      state.totalOrderAmount += orderArticle.price;
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cart: state.cart,
          quantity: state.totalOrderQuantity,
          amount: state.totalOrderAmount,
        })
      );
    },
    closeModal(state) {
      state.showModal = false;
      state.showLogin = false;
      state.showCart = false;
    },

    toggleCart(state) {
      state.showCart = !state.showCart;
      state.showModal = !state.showModal;
    },
    toggleLogin(state) {
      state.showLogin = !state.showLogin;
      state.showModal = !state.showModal;
    },

    toggleModal(state) {
      state.showModal = !state.showModal;
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

    setUserPaymentCard(state, user) {
      //fake in lack of backend support
      if (user) {
        state.paymentCard.cardHolderName = user.name;
      }
    },
    setNewUserPaymentCard(state, card) {
      //fake in lack of backend support
      state.paymentCard = card;
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
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cart: state.cart,
          quantity: state.totalOrderQuantity,
          amount: state.totalOrderAmount,
        })
      );
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
      let index = state.products.findIndex(
        (product) => product._id == updatedProduct._id
      );
      if (index != -1) {
        state.products[index] = updatedProduct;
      }
    },
    setError(state, error) {
      state.error = error;
      // console.log(error.message);
      setTimeout(() => {
        state.error = undefined;
      }, 2000);
      // clearTimeout(timeout);
    },
  },
  getters: {
    getCurrentUser: (state) => {
      return state.currentUser;
    },
  },
  actions: {
    updateUserPaymentCardFromLoggedInUser(context) {
      //fake in lack of backend support
      context.commit("setUserPaymentCard", context.state.currentUser);
    },
    setCurrentUserAddress(context, newAddress) {
      //fake due to lack of backend support
      let updatedUser = { ...context.state.currentUser };
      updatedUser.adress = newAddress;
      context.commit("setCurrentUser", updatedUser);
    },
    async initialProductLoad(context) {
      if (context.state.products.length <= 0) {
        await context.dispatch("refreshProducts");
      }
    },
    async refreshProducts(context) {
      try {
        context.commit("setLoading", true);
        const newProductList = await API.fetchProducts(context.state.userToken);
        context.commit("setStoreProducts", newProductList);
        context.commit("setLoading", false);
      } catch (error) {
        console.log(error);

        context.commit("setError", error);
      }
    },
    async registerNewProduct(context, newProduct) {
      try {
        const addedProduct = await API.postProductRequest(
          newProduct,
          context.state.userToken
        );
        context.commit("addProductToStoreProducts", addedProduct);
      } catch (error) {
        console.error(error);

        context.commit("setError", error);
      }
    },
    async getProductById(context, productId) {
      try {
        const fetchedProduct = await API.fetchProductById(productId);
        return fetchedProduct;
      } catch (error) {
        console.log(error);
        context.commit("setError", error);
      }
    },
    async deleteProductById(context, productId) {
      try {
        await API.deleteProductById(productId, context.state.userToken);
        context.commit("removeProductFromStateProductsById", productId);
      } catch (error) {
        // console.log(error);

        context.commit("setError", error);
      }
    },
    async registerNewOrder(context) {
      try {
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
          console.log("innan postOrderRequest");
          await API.postOrderRequest(orderRequestBody, context.state.userToken);
          console.log("efter postOrderRequest");
          context.commit("clearCart");
          // await context.dispatch("refreshOrderHistory");
        } else {
          console.log("Attempt to place order, but cart is empty");
        }
      } catch (error) {
        context.commit("setError", error);
        return Promise.reject("Failed to register new order! Reason:" + error);
      }
    },
    async refreshOrderHistory(context) {
      try {
        const fetchedOrderHistory = await API.fetchOrders(
          context.state.userToken
        );
        context.commit("setStoreOrderHistory", fetchedOrderHistory);
      } catch (error) {
        context.commit("setError", error);
      }
    },
    async updateProduct(context, productToUpdate) {
      try {
        console.log(productToUpdate._id);
        const updatedProduct = await API.postUpdateProductByIdRequest(
          productToUpdate,
          context.state.userToken
        );
        console.log(updatedProduct);
        context.commit("updateProductInStoreProducts", productToUpdate);
        // return Promise.resolve("Success");
      } catch (error) {
        console.log(error);
        context.commit("setError", error);
        return Promise.reject("Nåt gick snett!");
      }
    },
    async loginUser(context, payload) {
      try {
        const data = await APIauth.authorizeUser(payload);
        if (data) {
          context.commit("setToken", data.token);
          context.commit("setCurrentUser", data.user);
          context.commit("closeModal");
          context.dispatch("updateUserPaymentCardFromLoggedInUser");
        }
      } catch (error) {
        context.commit("setError", error);
      }
    },
    async createNewUser(context, payload) {
      try {
        const data = await APIauth.createNewUser(payload);
        if (data) {
          context.dispatch("loginUser", {
            email: payload.email,
            password: payload.password,
          });
        }
      } catch (error) {
        context.commit("setError", error);
      }
    },
    logout(context) {
      context.commit("logout");
    },
  },

  // modules: { account },
});
