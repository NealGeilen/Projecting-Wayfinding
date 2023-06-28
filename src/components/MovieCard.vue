<template>
  <div v-if="upcoming" class="poster">
    <iframe class="trailer" allow='autoplay' :src="'https://www.youtube.com/embed/' + videoId+'?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=' + videoId   as unknown as string" :title="upcoming.now.production.title  as unknown as string"></iframe>
    <div class="overlay"></div>
    <div class="card">
      <div class="contents">
        <h1>{{ upcoming.now.production.title }}</h1>
        <h3>{{ upcoming.now.hall }}</h3>
        <CountDown :id="upcoming.now.boxofficeId"
                   :start-time="new Date(upcoming.now.startDate as unknown as string)"></CountDown>
      </div>
      <div v-if="upcoming.next != undefined" class="next">
        <h3>Volgende: <br/> {{ upcoming.next.production.title }}
          {{ moment(upcoming.next.startDate as unknown as string).format('HH:mm') }}</h3>
      </div>
      <div v-if="l" class="arrow"></div>
      <div v-else class="arrowR"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import CountDown from "./CountDown.vue";
import {getCurrentMoviePlayed, NatLabEvent} from "../Api";
import moment from "moment";
import {ref, watchEffect} from "vue";

const props = defineProps<{
  events: NatLabEvent[],
  l: boolean
}>()
const upcoming = ref<{ now: NatLabEvent, next: NatLabEvent }>()
const videoId = ref<string>()

watchEffect(() => {
  upcoming.value = getCurrentMoviePlayed(props.events)
  videoId.value = upcoming.value.now.production.video1?.slice(upcoming.value.now.production.video1?.lastIndexOf('/')+1)
})

const x = setInterval(function () {
  upcoming.value = getCurrentMoviePlayed(props.events)
  videoId.value = upcoming.value.now.production.video1?.slice(upcoming.value.now.production.video1?.lastIndexOf('/')+1)
  clearInterval(x);
}, 1000)
</script>

<style scoped>
.poster {
  height: 100%;
  width: 50%;
  overflow: hidden;
}

iframe {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vw;
  overflow: hidden;
}

.overlay{
  background-color: rgba(0,0,0,.2);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.arrow {
  background-color: white;
  margin: 15px auto 0;
  height: 100px;
  width: 50%;
  clip-path: polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);
}

.arrowR {
  background-color: white;
  margin: 15px auto 0;
  height: 100px;
  width: 50%;
  clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
}

.card {
  color: #ffffff;
  top: 25%;
  position: absolute;
  text-align: center;
  right: 30%;
  width: 40%;
}

.card .contents {
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 1);
}

.card .next {
  background-color: #ffffff;
  color: black;
  margin-top: 15px;
  padding: 10px 0;
}
</style>