<template>
  <div v-if="upcoming.now != undefined" class="poster" :style="{'background-image': 'url('+upcoming.now.production.images.OpenGraph.filename+')'}">
    <div class="card">
      <div class="contents">
        <h1>{{upcoming.now.production.title}}</h1>
        <h3>{{upcoming.now.hall}}</h3>
        <CountDown :id="upcoming.now.boxofficeId" :start-time="new Date(upcoming.now.startDate as string)"></CountDown>
      </div>
      <div v-if="upcoming.next != undefined" class="next">
        <h3>Next: <br/> {{upcoming.next.production.title}} {{moment(upcoming.next.startDate).format('HH:mm')}}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import CountDown from "./CountDown.vue";
import {NatLabEvent} from "../Api";
import moment from "moment";
import {onMounted, ref, watch} from "vue";
const props = defineProps<{
  events: NatLabEvent[]
}>()
const upcoming = ref<{now: NatLabEvent|undefined, next: NatLabEvent|undefined}>({now: undefined, next: undefined})
onMounted(() => {
  upcoming.value=getCurrentMoviePlayed()
  console.log(upcoming.value)
})

watch(() => {
  upcoming.value=getCurrentMoviePlayed()
})

const x = setInterval(function () {
  upcoming.value=getCurrentMoviePlayed()
  clearInterval(x);
}, 1000)

function getCurrentMoviePlayed(): {now: NatLabEvent|undefined, next: NatLabEvent|undefined}{
  const events = props.events.filter(e =>{
    const startDate = moment(e.startDate)
    startDate.add(e.production.movie.runningTime, "m")
    return startDate > moment() && startDate.format('DD-MM-yyyy') === moment().format('DD-MM-yyyy')
  })
  return {
    now: events.at(0),
    next: events.at(1)
  }
}
</script>

<style scoped>
.poster{
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: contain;
}
.card{
  color: #ffffff;
  top: 25%;
  position: absolute;
  text-align: center;
  min-width: 25%;
  max-width: 30%;
}
.card .contents{
  padding: 10px 15px;
  background-color: rgba(0,0,0,.6);
}
.card .next{
  background-color: #ffffff;
  color: black;
  margin-top: 15px;
  padding: 10px 0;
}
</style>