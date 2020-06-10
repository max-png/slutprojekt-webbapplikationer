import Vue from "vue";
import VueRouter from "vue-router";
import ProductsView from "@/views/ProductsView.vue";
import Product from "@/components/Product.vue";
import EditProduct from "@/components/EditProduct.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import AdminView from "@/views/AdminView.vue";
import AccountView from "@/views/AccountView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import TestAPIView from "@/views/TestAPIView";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/products",
  },
  {
    path: "/testapi",
    name: "TestApi",
    component: TestAPIView,
  },
  {
    path: "/products",
    name: "Products",
    component: ProductsView,
    children: [
      {
        path: ":id",
        name: "Product",
        component: Product,
      },
    ],
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: CheckoutView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    beforeEnter: (to, from, next) => {
      let role = JSON.parse(localStorage.getItem("currentUser")).role;

      if (role != "admin") {
        store.commit("toggleErrorModal");
        store.commit("setError", {
          message: "You need to sign in as a admin to access this page",
        });
        // console.log(store);
        store.commit("closeModal");

        next(from);
      } else {
        console.log("Navigation complete");
        next();
      }
    },
    children: [
      {
        path: ":id",
        name: "EditProduct",
        component: EditProduct,
      },
    ],
  },
  {
    path: "/account",
    name: "Account",
    component: AccountView,
    beforeEnter: (to, from, next) => {
      let role = JSON.parse(localStorage.getItem("currentUser"));

      if (role == undefined || role == null) {
        store.commit("showModal");
        store.commit(
          "setError",
          "You need to sign in as a customer to access this page"
        );

        next(from);
      } else {
        // console.log("Navigation complete");
        next();
      }
    },
  },
  {
    path: "/registration",
    name: "Registration",
    component: RegistrationView,
    // beforeEnter: (to, from, next) => {
    //   console.log(to);
    //   console.log(from);
    //   if (store.state.currentUser.role != "") {
    //     alert("Du måste vara utloggad för att nå resursen");
    //     store.commit("toggleLogin");
    //     next({ path: "/" });
    //   } else {
    //     console.log("Navigation complete");
    //     next();
    //   }
    // },
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
