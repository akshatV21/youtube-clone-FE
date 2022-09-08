import { createRouter, createWebHistory } from "vue-router"
import RegisterView from "../views/auth/RegisterView.vue"
import LoginView from "../views/auth/LoginView.vue"
import HomeView from "../views/home/HomeView.vue"
import VideosView from "../views/home/VideosView.vue"
import ChannelView from "../views/channel/ChannelView.vue"
import WatchView from "../views/WatchView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/channel",
      name: "channel",
      component: ChannelView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/",
          name: "videos",
          component: VideosView,
        },
      ],
    },
    {
      path: "/watch",
      name: "watch",
      component: WatchView,
    },
  ],
})

export default router
