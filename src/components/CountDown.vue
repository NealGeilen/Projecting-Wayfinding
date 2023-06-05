<template>
  <h2 :id="id"></h2>
</template>

<script setup lang="ts">
import {NatLabEvent} from "../Api.js";

const props = defineProps<{
    startTime: Date,
    id:string
}>()

const x = setInterval(function () {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = props.startTime.getTime() - now;

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById(props.id) !== null){
        // Display the result in the element with id="demo"
        document.getElementById(props.id).innerHTML = (hours > 0 ? hours + "h " : '')
            + (minutes > 0 ? minutes + "m ": '');

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById(props.id).innerHTML = "Nu spelend";
        }
    }


}, 1000);
</script>

<style scoped>

</style>