<script setup lang="ts">
import {ref} from "vue";
import MovieCard from "./components/MovieCard.vue";
import {Hall, NatLab, NatLabEvent} from "./Api";

var myHeaders = new Headers();
myHeaders.append("apiKey", "02a2eb195cb8b6f4df3b05c466440fb22f3c54922890");

let response = ref<NatLab>({events:[]} as NatLab)
var formdata = new FormData();
formdata.append("past", "false");
// formdata.append("productionCode", "80189");
formdata.append("startDate", "18-04-2023");

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    credentials: 'include',
    mode: 'cors',
    // referrerPolicy: 'origin-when-cross-origin'
};

fetch("https://www.natlab.nl/nl/feed/events", requestOptions)
    .then(response => response.json())
    .then(result => response.value = result as NatLab)
    .catch(error => console.log('error', error));
</script>

<template >
    <div v-if="response.events.length > 0" style="display: inline-flex">
        <MovieCard :n-event="response.events.filter(e => e.hall === Hall.Zaal1)[0]"></MovieCard>
        <MovieCard :n-event="response.events.filter(e => e.hall === Hall.Zaal2)[1]"></MovieCard>
    </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
