<script setup lang="ts">
import {getCurrentMoviePlayed, NatLabEvent} from "../Api";
import {ref, watch, watchEffect} from "vue";
import moment from "moment";

const props = defineProps<{
  events: NatLabEvent[]
}>()
const upcoming = ref<{now: NatLabEvent, next: NatLabEvent}>()

watchEffect(() => {
  upcoming.value= getCurrentMoviePlayed(props.events)
})

const x = setInterval(function () {
  upcoming.value=getCurrentMoviePlayed(props.events)
  clearInterval(x);
}, 1000)
</script>

<template>
  <div v-if="upcoming" class="moviePoster">
    <div class="poster" :style="{'background-image': 'url('+upcoming.now.production.images.HDPortrait.filename+')'}">
      <h2 class="count">{{upcoming.now.production.title}} {{moment(upcoming.now.startDate).format('HH:mm')}}</h2>
    </div>

  </div>
</template>

<style>
.moviePoster{
  background-color: white;
  border-radius: 2px;
  max-width: 150px;
  color: black;
}
.poster{
  height: 250px;
  width: 150px;
  background: no-repeat center center;
  background-size: cover;
  position: relative;
}
.poster .count{
  text-align: center;
  color: white;
  background-color: rgba(0,0,0,.6);
  margin: unset;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
}
</style>