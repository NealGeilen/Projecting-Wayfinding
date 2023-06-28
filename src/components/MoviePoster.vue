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
      <div class="overlay">
        <h2 class="count">
          {{upcoming.now.production.title}}

        </h2>
        <p>
          {{moment(upcoming.now.startDate).format('HH:mm')}}
          <br/>
          {{upcoming.now.hall}}
        </p>
      </div>


    </div>

  </div>
</template>

<style>
.moviePoster{
  background-color: white;
  border-radius: 2px;
  color: black;
}
.poster{
  height: 250px;
  width: 150px;
  background: no-repeat center center;
  background-size: cover;
  position: relative;
  border-radius: 4px;
}
.poster p{
  color: white;
  font-size: 21px;
  top: 65%;
  position: absolute;
  left: 0;
  right: 0;
}
.poster .count{
  top: 30%;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  padding: 4px;
  margin: unset;
}
.overlay{
  background-color: rgba(0,0,0,.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>