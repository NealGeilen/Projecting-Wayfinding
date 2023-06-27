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
  <div class="container" id="l2">
    <div class="lvl">1</div>
    <img class="map" src="../assets/F2.png">
    <div class="square" id="Room6">
      <MoviePoster :events="response.events.filter(e => e.hall === Hall.Podiumzaal)"></MoviePoster>
    </div>
    <div class="square" id="Room5">
      <MoviePoster :events="response.events.filter(e => e.hall === Hall.Auditorium)"></MoviePoster>
    </div>
  </div>

<div class="container" id="l1">
  <div class="lvl">0</div>
  <img class="map" src="../assets/F1.png">
  <img class="pin" src="../assets/Map-Pin.svg">
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
</div>
</template>

<style scoped>
.container{
  height: 1280px;
  width: 1920px;
  position: absolute;
}
.map{
  max-height: 100%;
  max-width: 100%;
}
.square{
  position: absolute;
  height: 250px;
  width: 150px;
}
#Room6{
  top: 32%;
  left: 25%;
}
#Room5{
  top: 25%;
  left: 61%;
}
#Room4{
  top: 32%;
  left: 25%;
}
#Room3{
  top: 25%;
  left: 36%;
}
#Room2{
  top: 13%;
  left: 58%;
}
#Room1{
  top: 7%;
  left: 70%;
}
#l1, #l2{
  //max-width: 100%;
}
#l1{
  top: 35%;
}
.lvl{
  padding: 10px 22px;
  background-color: white;
  color: black;
  text-align: center;
  position: absolute;
  bottom: 33%;
  left: 20%;
  font-size: 48px;
}
.pin{
  position: absolute;
  bottom: 58%;
  left: 58%;
  height: 60px;
}
</style>