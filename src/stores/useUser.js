import { ref } from "vue"
import { defineStore } from "pinia"
import CONFIG from "../config"
import fetchUser from "../helpers/fetchUser"

export const useUserStore = defineStore("user", () => {
  const user = ref("")
  const loginErr = ref("")
  const registerErr = ref("")

  // register user
  const registerUser = async (username, email, password) => {
    const request = await fetch(`${CONFIG.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })

    const response = await request.json()

    if (!response.success) {
      console.log(response.message)
      registerErr.value = response.message
      return
    }

    user.value = response.user
    localStorage.setItem("token", response.user.token)
  }

  // login user
  const loginUser = async (input, password) => {
    const request = await fetch(`${CONFIG.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input, password }),
    })

    const response = await request.json()

    if (!response.success) {
      console.log(response.message)
      loginErr.value = response.message
      return
    }

    user.value = response.user
    localStorage.setItem("token", response.user.token)
  }

  const getUser = async token => {
    const fetchedUser = await fetchUser(token)
    user.value = fetchedUser
  }

  return { user, registerUser, loginUser, getUser, loginErr, registerErr }
})
