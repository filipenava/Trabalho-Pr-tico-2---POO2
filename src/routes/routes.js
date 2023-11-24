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
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/game'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/game',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout
      },
      {
        path: 'game',
        name: 'Game',
        component: GameView
      },
      {
        path: 'game-admin',
        name: 'GameAdmin',
        component: GameViewAdmin
      },
      {
        path: 'reports',
        name: 'Reports',
        component: Reports
      },
      {
        path: 'order-list',
        name: 'Order List',
        component: OrderList
      },
      {
        path: 'order-list-admin',
        name: 'Order List Admin',
        component: OrderListAdmin
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
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
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
