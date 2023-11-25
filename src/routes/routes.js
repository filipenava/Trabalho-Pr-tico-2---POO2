// src/routes/routes.js

import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import UserRegister from 'src/pages/UserRegister.vue'
import UserLogin from 'src/pages/UserLogin.vue'
import GameView from 'src/pages/GamesView.vue'
import GameViewAdmin from 'src/pages/GamesViewAdmin.vue'
import Checkout from 'src/pages/Checkout.vue'
import Reports from 'src/pages/Reports.vue'
import OrderList from 'src/pages/OrderList.vue'
import OrderListAdmin from 'src/pages/OrderListAdmin.vue'
import TableList from 'src/pages/TableList.vue'

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/game',
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'AdminLogin',
    component: UserLogin
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/game',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout,
        meta: { requiresAuth: true }
      },
      {
        path: 'game',
        name: 'Game',
        component: GameView,
        meta: { requiresAuth: true }
      },
      {
        path: 'game-admin',
        name: 'GameAdmin',
        component: GameViewAdmin,
        meta: { requiresAuth: true, requiresAdmin: true  }
      },
      {
        path: 'reports',
        name: 'Reports',
        component: Reports,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'order-list',
        name: 'Order List',
        component: OrderList,
        meta: { requiresAuth: true }
      },
      {
        path: 'order-list-admin',
        name: 'Order List Admin',
        component: OrderListAdmin,
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile,
        meta: { requiresAuth: true }
      },
      {
        path: 'register',
        name: 'Register',
        component: UserRegister
      },
      {
        path: 'login',
        name: 'Login',
        component: UserLogin
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList,
        meta: { requiresAuth: true, requiresAdmin: true }
      },

    ]
  },
  { path: '*', component: NotFound }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "nav-item active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});


router.beforeEach((to, from, next) => {
  // Se o usuário está logado e tenta acessar a página de login,
  // redireciona para a página de games.
  // if (store.getters['estaLogado'] && to.path === '/admin/login') {
  //   next({ path: '/admin/game' });
  //   return;
  // }

  // Verifica se a rota requer autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Se o usuário não está logado, redireciona para o login
    if (!store.getters['estaLogado']) {
      next({ path: '/admin/login' });
    } else {
      // Verifica se a rota requer papel de gerente
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (store.getters['usuarioPapel'] === 'gerente') {
          next();
        } else {
          
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});



/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default router
