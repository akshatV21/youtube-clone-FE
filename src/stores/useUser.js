import { ref, computed } from "vue"
import { defineStore } from "pinia"
import CONFIG from "../config"

export const useUserStore = defineStore("user", () => {
  const user = ref(localStorage.getItem("token") ? "" : null)

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

  return { user, registerUser }
})
