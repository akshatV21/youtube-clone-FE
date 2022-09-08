<script setup>
import { toRefs } from "vue"
import { RouterLink } from "vue-router"
import { useRouter } from "vue-router"
import { useUserStore } from "../../stores/useUser"

const router = useRouter()

const { user, getUser } = toRefs(useUserStore())

if (!user.value) {
  const token = localStorage.getItem("token")
  if (token) {
    ;(async () => {
      await getUser.value(token)
      router.push("/")
    })()
  } else {
    router.push("/login")
  }
}
</script>

<template>
  <section class="bg">
    <div class="sidebar-block">
      <div class="user">
        <div class="dp"></div>
        <span>
          <p>{{ user.username }}</p>
          <p>{{ user.email }}</p>
        </span>
      </div>
      <div class="links">
        <RouterLink to="/">History</RouterLink>
        <RouterLink to="/">Watch later</RouterLink>
        <RouterLink to="/">Liked videos</RouterLink>
        <RouterLink to="/">Playlists</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg {
  width: 100%;
  min-height: 100vh;
  background-color: var(--dark-blue-2);
}

.sidebar-block {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: var(--not-very-dark-blue);
  border: 2px solid var(--white-o-2);
}

.user {
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 2px solid var(--white-o-2);
  cursor: pointer;
}

.dp {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--input-color);
}

.user span {
  overflow: hidden;
  color: var(--white);
  font-weight: 500;
}

.links {
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
}

.links a {
  width: 100%;
  color: var(--white);
  padding: 15px;
  text-align: center;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.1s ease;
  text-decoration: none;
}

.links a:hover {
  background-color: var(--white-o-2);
}

/* .links .router-link-exact-active {
  background-color: var(--white-o-2);
} */
</style>
