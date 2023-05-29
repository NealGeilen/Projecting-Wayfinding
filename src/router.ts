import { createRouter, createWebHistory } from "vue-router"
import Hallway from "./views/Hallway.vue";
import Main from "./views/Main.vue";

const routes = [
    {
        path: "/hall",
        name: "Hall1",
        component: Hallway,
    },
    {
        path: "/main",
        name: "Main",
        component: Main,
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
export default router
