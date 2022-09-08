import { ref } from "vue"
import { defineStore } from "pinia"
import CONFIG from "../config"

export const useUserStore = defineStore("user", () => {
  const token = localStorage.getItem("token")
  const user = ref("")

  if (token) {
    ;(async () => {
      user.value = await fetchUser(token)
    })()
  } else {
    user.value = null
  }

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
      console.log("Failed to register user!")
      return
    }

    user.value = response.user
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
      console.log("Failed to login user!")
      return
    }

    user.value = response.user
    localStorage.setItem("token", response.user.token)
  }

  return { user, registerUser, loginUser }
})
