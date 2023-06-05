<script setup lang="ts">
import {ref} from "vue";
import {Hall, NatLab, request} from "../Api";
import MoviePoster from "../components/MoviePoster.vue";
let response = ref<NatLab>({events:[]} as NatLab)
request().then(r => {
  response.value = r as NatLab
})
</script>

<template>
<img class="map" src="../assets/F1.png">
  <div class="square" id="Room4">
    <MoviePoster :events="response.events.filter(e => e.hall === Hall.Zaal4)"></MoviePoster>
  </div>
  <div class="square" id="Room3">
    <MoviePoster :events="response.events.filter(e => e.hall === Hall.Zaal3)"></MoviePoster>
  </div>
  <div class="square" id="Room2">
    <MoviePoster :events="response.events.filter(e => e.hall === Hall.Zaal2)"></MoviePoster>
  </div>
  <div class="square" id="Room1">
    <MoviePoster :events="response.events.filter(e => e.hall === Hall.Zaal1)"></MoviePoster>
  </div>
</template>

<style scoped>
.map{
  max-height: 100%;
  max-width: 100%;
  position: relative;
}
.square{
  position: absolute;
}
.square img{
  max-width: 100%;
  max-height: 100%;
  border-radius: 1px;
}
#Room4{
  top: 325px;
  left: 425px;
}
#Room3{
  top: 250px;
  left: 675px;
}
#Room2{
  top: 75px;
  left: 1050px;
}
#Room1{
  top: 10px;
  left: 1300px;
}
</style>