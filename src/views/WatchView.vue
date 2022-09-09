<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import CONFIG from "../config"
import { useUserStore } from "../stores/useUser"

const route = useRoute()
const videoId = route.query.v

const video = ref({})

const fetchVideo = async () => {
  const request = await fetch(`${CONFIG.API_URL}/videos/${videoId}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  const response = await request.json()

  if (!response.success) {
    console.log(response.message)
    return
  }

  video.value = response.video
}

fetchVideo()
</script>

<template>
  <section class="bg">
    <div class="video">
      <div class="player">
        <iframe :src="video.link"></iframe>
        <div class="info">
          <div class="top">
            <p class="title">{{ video.title }}</p>
          </div>
          <div class="desc"></div>
          <div class="comments"></div>
        </div>
      </div>
    </div>
    <div class="videos"></div>
  </section>
</template>

<style scoped>
.bg {
  width: 100%;
  min-height: 100vh;
  background-color: var(--not-very-dark-blue);
}

.video {
  width: 75%;
  min-height: 100vh;
  padding: 60px;
  border: 2px solid var(--white-o-2);
  overflow: scroll;
}

iframe {
  width: 100%;
  height: 600px;
  background-color: var(white-o-2);
  border: 2px solid var(--white-o-2);
}

.title {
  padding: 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--white);
  border-bottom: 2px solid var(--white-o-2);
  border-top: 2px solid var(--white-o-2);
}
</style>
