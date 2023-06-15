<script setup lang="ts">

import {Hall, NatLab, request} from "../Api";
import {ref} from "vue";
import MovieCard from "../components/MovieCard.vue";

let response = ref<NatLab>({events:[]} as NatLab)
request().then(r => {
  response.value = r as NatLab
})

</script>

<template>
  <div class="container" v-if="response != undefined">
    <div class="overlay"></div>
    <MovieCard class="poster1" :events="response.events.filter(e => e.hall === Hall.Zaal2)"></MovieCard>
    <MovieCard class="poster2" :events="response.events.filter(e => e.hall === Hall.Zaal1)"></MovieCard>
  </div>
</template>

<style>
.container{
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
}

.poster1{
  background: center left no-repeat fixed;
  clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%);
  background-size: contain;
}
.poster2{
  background: no-repeat center left fixed;
  clip-path: polygon(100% 0, 50% 0, 50% 100%, 0% 100%);
  background-size: contain;
}
.poster1 .card{
  left: 15%;
}

.poster2 .card{
  right: 15%;
}

</style>