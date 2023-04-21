import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    component: () => import(/* webpackChunkName: "home" */'../views/home/Home')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */'../views/cartList/CartList')
  },
  {
    path: '/orderConfirmation/:id?/:addressId?',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */'../views/orderConfirmation/OrderConfirmation'),
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */'../views/orderList/OrderList')
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import(/* webpackChunkName: "person" */'../views/person/Person')
  },
  {
    path: '/myAddressList',
    name: 'MyAddressList',
    component: () => import(/* webpackChunkName: "myAddressList" */'../views/address/MyAddressList')
  },
  {
    path: '/upsertAddress/:id',
    name: 'UpsertAddress',
    component: () => import(/* webpackChunkName: "upsertAddress" */'../views/address/UpsertAddress')
  },
  {
    path: '/chooseAddress/:id',
    name: 'ChooseAddress',
    component: () => import(/* webpackChunkName: "chooseAddress" */'../views/address/ChooseAddress')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */'../views/shop/Shop')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */'../views/login/Login'),
    // 访问登录页面之前执行
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: "Home" }) : next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */'../views/register/Register'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: "Home" }) : next();
    }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//路由跳转都会执行
//登录才可访问其他页面
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  (!isLogin && (to.name !== "Login" && to.name !== "Register")) ? next({ name: "Login" }) : next();
})

export default router
