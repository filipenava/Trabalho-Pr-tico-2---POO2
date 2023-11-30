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
    redirect: '/admin/login' 
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/admin',
    component: DashboardLayout,
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

  
  // Tenta restaurar o estado de autenticação do localStorage
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  console.log('Usuário logado inicio chamou:', usuarioLogado);
  // console.log('Usuário logado stateeee:', usuarioLogado);
  if (usuarioLogado) {
    const userData = JSON.parse(usuarioLogado);
    console.log('Usuário logado stateeee:', userData);
    store.commit('SET_USUARIO_LOGADO', userData);
  }

  // Verifica se a rota requer autenticação
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log('requiresAuth:', requiresAuth);
  // Verifica se a rota requer ser um usuário administrador
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  console.log('requiresAdmin:', requiresAdmin);
  
  
      // Estado atual de autenticação do usuário (você deve implementar isso)
  const isAuthenticated = store.getters["estaLogado"];
  console.log('isAuthenticated:', isAuthenticated);
  
  // Tipo de usuário (ex: 'cliente', 'gerente', null para deslogado)
  const userType = store.getters["usuarioPapel"];
  console.log('userType:', userType);
  console.log('iniciar comparação', from);
  console.log('iniciar comparação', to);

  if (requiresAuth &&  !isAuthenticated) {
    console.log("comparacao",requiresAuth &&  isAuthenticated);
    console.log("comparacao",requiresAuth);
    console.log("comparacao",isAuthenticated);
    // Se a rota requer autenticação e o usuário não está autenticado, redireciona para login
    next({ name: 'Login' });
    
  } else if (requiresAuth && requiresAdmin && userType !== 'gerente') {
    // Se a rota requer um usuário administrador e o usuário não é um gerente, redireciona para uma página de erro ou início
    next({ name: 'Game' }); // ou { name: 'Error' }, dependendo da sua configuração
  } else {
    // Se nenhum dos casos acima, prossegue para a rota desejada
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
