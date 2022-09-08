<script setup></script>

<template>
  <section class="bg">
    <div class="video">
      <div class="player">
        <iframe src="https://www.youtube.com/embed/3_kobDkp_1g"></iframe>
        <div class="info">
          <div class="top">
            <p class="title">This is the title of the video you want to watch!!</p>
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
}

iframe {
  background-color: var(white-o-2);
}
</style>
