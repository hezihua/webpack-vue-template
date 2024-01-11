import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let routes = [];
// 登录
const loginRoute = {
  path: "/login",
  name: "Login",
  component: () => import('../common/loginPage') 
};
// 首页
const mainRoute = {
  path: "/main",
  name: "Main",
  component: () => import('../common/mainPage') ,
};

routes.push(loginRoute, mainRoute);

routes.unshift({
  path: "*",
  redirect: routes[0].path,
});

const router = new Router({
  routes,
});

export default router;
