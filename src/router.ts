import { createRouter, createWebHistory } from "vue-router"
import Hallway from "./views/Hallway.vue";
import Main from "./views/Main.vue";
import Hallway2 from "./views/Hallway2.vue";

const routes = [
    {
        path: "/hall1",
        name: "Hall1",
        component: Hallway,
    },
    {
        path: "/hall2",
        name: "Hall2",
        component: Hallway2,
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
