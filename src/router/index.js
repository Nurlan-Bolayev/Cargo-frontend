import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserDashboard from "@/views/UserDashboard";
import Register from "@/views/Register";
import AddPackage from "@/views/Admin/AddPackage";
import ChangePackageStatus from "@/views/Admin/ChangePackageStatus";
import Login from "@/views/Login";
import AdminLogin from "@/views/Admin/AdminLogin";
import AdminDashboard from "@/views/Admin/AdminDashboard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: "/register",
    component: Register
  },

  {
    path: '/login',
    component: Login
  },
  {
    path: '/adminLogin',
    component: AdminLogin
  },
  {
    path: '/profile',
    component: UserDashboard
  },

  {
    path: '/admin/changeStatus',
    component: ChangePackageStatus,
  },

  {
    path: '/admin/addPackage',
    component: AddPackage
  },

  {
    path: '/adminDashboard',
    component: AdminDashboard
  },

  {
    path: '/users/:user/packages/:id',
    component: ChangePackageStatus
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
