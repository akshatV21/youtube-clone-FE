<script setup>
import { ref, toRefs } from "vue"
import { useRoute } from "vue-router"
import CONFIG from "../config"
import { useUserStore } from "../stores/useUser"

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

const route = useRoute()
const videoId = route.query.v

const video = ref({})
const subscribeState = ref('')

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
            <div class="stats">
              <p>{{ video.likes }} likes</p>
              <p>{{ video.dislikes }} dislikes</p>
              <p>{{ video.views }} views</p>
            </div>
          </div>
          <div class="channel">
            <div class="left">
              <p><div class="dp"></div>{{ video.channelId.name }}</p>
              <p>{{  video.channelId.subscribers.length }} subscribers</p>
            </div>
            <button :class="user.subscribed.includes(video.channelId._id) ? subscribeState = `subscribed` : subscribeState = `unsubscribed`">
              {{ subscribeState === `unsubscribed` ? 'Subscribe' : 'Unsubscribe'}}
            </button>
          </div>
          <div class="desc">
            {{ video.description }}
          </div>
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

.top {
  padding: 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--white);
  border-bottom: 2px solid var(--white-o-2);
  border-top: 2px solid var(--white-o-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}

.channel, .desc{
  padding: 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--white);
  border-bottom: 2px solid var(--white-o-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button{
  font-size: 1.1rem;
  padding: .6em 1.4em;
  border: 2px solid var(--white-o-2);
  cursor: pointer;
  color: var(--not-very-dark-blue);
  border-radius: 4px;
}

.subscribed{
  background-color: var(--white-o-2);
}

.unsubscribed {
  background-color: var(--blue);
}

</style>
