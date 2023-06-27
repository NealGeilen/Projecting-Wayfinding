<template>
  <div v-if="upcoming" :style="{'background-image': 'url('+upcoming.now.production.images.OpenGraph.filename+')'}"
       class="poster">
    {{ upcoming.now.production.video1}}
    <iframe width="1280" height="720" :src="upcoming.now.production.video1  as unknown as string" :title="upcoming.now.production.title  as unknown as string" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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

watchEffect(() => {
  upcoming.value = getCurrentMoviePlayed(props.events)
})

const x = setInterval(function () {
  upcoming.value = getCurrentMoviePlayed(props.events)
  clearInterval(x);
}, 1000)
</script>

<style scoped>
.poster {
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: contain;
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
  width: 30%;
}

.card .contents {
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, .6);
}

.card .next {
  background-color: #ffffff;
  color: black;
  margin-top: 15px;
  padding: 10px 0;
}
</style>