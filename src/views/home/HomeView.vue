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
  <section class="bg">HOME</section>
</template>

<style scoped>
.bg {
  width: 100%;
  min-height: 100vh;
  background-color: var(--not-very-dark-blue);
  color: whitesmoke;
  font-size: 4rem;
}
</style>
