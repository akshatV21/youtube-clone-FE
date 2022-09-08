<script setup>
import { ref, toRefs } from "vue"
import CONFIG from "../../config"
import { useUserStore } from "../../stores/useUser"

const { user } = toRefs(useUserStore())
const channelId = user.value.channel

const getUserChannel = async () => {
  if (!channelId) return
  const request = await fetch(`${CONFIG.API_URL}/channel`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
}
</script>

<template>
  <section class="bg"></section>
</template>

<style scoped></style>
