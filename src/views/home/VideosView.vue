<script setup>
import { toRefs } from "vue"
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
    <div class="nav-bar">
      <span>
        <input type="text" placeholder="Search for videos..." />
      </span>
    </div>
    <div class="videos"></div>
  </section>
</template>

<style scoped>
.bg {
  width: 100%;
  border: 2px solid var(--white-o-2);
  padding: 0 0 0 249px;
}

.nav-bar {
  /* width: 100%; */
  height: 81.5px;
  background-color: var(--not-very-dark-blue);
  right: 0;
  position: fixed;
  top: 0;
  left: 250px;
  padding: 20px;
  border: 2px solid var(--white-o-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.videos {
  width: 100%;
  height: 100vh;
  border: 2px solid var(--white-o-2);
  overflow: scroll;
}

.nav-bar input {
  width: 400px;
  font-size: 1.1rem;
  padding: 0.6em 0.9em;
  border-radius: 4px;
  background-color: var(--input-color);
  border: 2px solid var(--white-o-2);
  color: var(--white);
}
</style>
