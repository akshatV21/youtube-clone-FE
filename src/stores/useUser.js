import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core"

export const useUserStore = defineStore("user", () => {
  const user = ref(localStorage.getItem("token") ? "" : null)

  const registerUser = async (username, email, password) => {
    const 
  }

  return { user }
})
