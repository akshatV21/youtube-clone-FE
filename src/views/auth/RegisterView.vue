<script setup>
import { ref, toRefs } from "vue"
import { useUserStore } from "../../stores/useUser"

const { user, registerUser } = toRefs(useUserStore())
if (!user.value) {
  console.log("Please log in first!!")
}

const username = ref("")
const email = ref("")
const password = ref("")

const register = async () => {
  await registerUser.value(username, email, password)
  if (user.value) {
    console.log(useUser)
  }
}
</script>

<template>
  <section class="bg">
    <div class="main-block">
      <span>
        <p>USERNAME:</p>
        <input type="text" v-model="username" placeholder="Username" />
      </span>
      <span>
        <p>EMAIL:</p>
        <input type="email" v-model="email" placeholder="Email" />
      </span>
      <span>
        <p>PASSWORD:</p>
        <input type="text" v-model="password" placeholder="Password" />
      </span>
      <button @click="register">REGISTER</button>
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
