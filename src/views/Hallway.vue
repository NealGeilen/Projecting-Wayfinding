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
    <MovieCard class="poster" :events="response.events.filter(e => e.hall === Hall.Zaal2)" :l="false"></MovieCard>
    <MovieCard class="poster" :events="response.events.filter(e => e.hall === Hall.Zaal1)" :l="false"></MovieCard>
  </div>
</template>

<style>
.container{
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
}

</style>