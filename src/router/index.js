import Vue from 'vue'
import VueRouter from 'vue-router'
import taskRoutes from './task';
Vue.use(VueRouter)
const routes = [
    taskRoutes
]

const router = new VueRouter({
    mode: 'history',
    routes: routes,
})

export default router