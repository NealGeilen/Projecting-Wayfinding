<script setup lang="ts">
import {ref} from "vue";
import {Hall, NatLab, request} from "../Api";
let response = ref<NatLab>({events:[]} as NatLab)
request().then(r => {
  response.value = r as NatLab
})
</script>

<template>
<img class="map" src="../assets/F1.png">
  <div class="square" id="Room4">
    <img :src="response.events.filter(e => e.hall === Hall.Zaal4)[0].production.images.HDPortrait.filename">
  </div>
  <div class="square" id="Room3">
    <img :src="response.events.filter(e => e.hall === Hall.Zaal3)[0].production.images.HDPortrait.filename">
  </div>
  <div class="square" id="Room2">
    <img :src="response.events.filter(e => e.hall === Hall.Zaal2)[0].production.images.HDPortrait.filename">
  </div>
  <div class="square" id="Room1">
    <img :src="response.events.filter(e => e.hall === Hall.Zaal1)[0].production.images.HDPortrait.filename">
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
  background-color: white;
  padding: 5px;
  border-radius: 2px;
  height: 200px;
}
.square img{
  max-width: 100%;
  max-height: 100%;
  border-radius: 1px;
}
#Room4{
  top: 375px;
  left: 425px;
}
#Room3{
  top: 275px;
  left: 675px;
}
#Room2{
  top: 125px;
  left: 1050px;
}
#Room1{
  top: 40px;
  left: 1300px;
}
</style>