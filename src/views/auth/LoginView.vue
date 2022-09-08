<script setup>
import { ref, toRefs } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "../../stores/useUser"

const router = useRouter()

const { user, loginUser, loginErr } = toRefs(useUserStore())

const input = ref("")
const password = ref("")

const login = async () => {
  await loginUser.value(input.value, password.value)

  if (!user.value) {
    alert("Error loggin in!")
    return
  }

  router.push("/")
}
</script>

<template>
  <section class="bg">
    <div class="main-block">
      <h1 style="text-align: center">{{ loginErr }}</h1>
      <span>
        <p>INPUT:</p>
        <input type="text" v-model="input" placeholder="Username or Email" />
      </span>
      <span>
        <p>PASSWORD:</p>
        <input type="text" v-model="password" placeholder="Password" />
      </span>
      <button @click="login">LOGIN</button>
    </div>
  </section>
</template>

<style scoped>
.bg {
  width: 100%;
  height: 100vh;
  background-color: var(--not-very-dark-blue);
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-block {
  width: 300px;
  background-color: var(--dark-blue);
  color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 25px;
}

span {
  width: 100%;
}

input {
  width: 100%;
}

p {
  font-weight: 500;
  margin-bottom: 4px;
  margin-left: 8px;
}

input {
  font-size: 1.1rem;
  padding: 0.6em 0.9em;
  border-radius: 4px;
  background-color: var(--input-color);
  border: 3px solid var(--not-very-dark-blue);
  color: var(--white);
}

button {
  font-size: 1.1rem;
  padding: 0.7em;
  cursor: pointer;
  background-color: var(--blue);
  border: 2px solid var(--blue);
  border-radius: 4px;
  letter-spacing: 4px;
  font-weight: 550;
}

button:hover {
  opacity: 0.8;
}
</style>
