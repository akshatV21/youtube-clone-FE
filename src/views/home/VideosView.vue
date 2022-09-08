<script setup>
import { ref, toRefs } from "vue"
import { useRouter } from "vue-router"
import CONFIG from "../../config"
import { useUserStore } from "../../stores/useUser"

const router = useRouter()

const { user, getUser } = toRefs(useUserStore())

const videos = ref([])

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

const fetchVideos = async () => {
  const request = await fetch(`${CONFIG.API_URL}/videos/recommended`, {
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

  videos.value = response.videos
}

fetchVideos()
</script>

<template>
  <section class="bg">
    <div class="nav-bar">
      <span>
        <input type="text" placeholder="Search for videos..." />
      </span>
    </div>
    <div class="videos">
      <div class="video-block" v-for="video in videos" :key="video._id">
        <div class="thumbnail"></div>
        <p class="title">{{ video.title.substring(0, 40) }}...</p>
        <div class="low">
          <span>{{ video.views }} views</span>
          <span>{{ video.channelId.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg {
  width: 100%;
  border: 2px solid var(--white-o-2);
  padding: 80px 0 0 249px;
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
  display: flex;
  padding: 20px;
  gap: 25px;
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

.video-block {
  width: 250px;
  height: 240px;
  cursor: pointer;
}

.thumbnail {
  width: 100%;
  height: 160px;
  background-color: var(--white-o-2);
}

.title {
  word-break: break-all;
  padding: 8px 6px 4px 6px;
  color: var(--white);
  font-weight: 500;
}

.low {
  color: var(--white-o-6);
  padding: 6px;
  display: flex;
  justify-content: space-between;
}
</style>
