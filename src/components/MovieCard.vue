<template>
    <div style="border-radius: 4px; margin: 12px; padding: 0 20px; color: #f9f9f9">
        <div>
            <h1>{{ nEvent.production.title }} {{nEvent.production.movie.productionYear}}</h1>
            {{ date.getHours() }}:{{ date.getMinutes() }}
        </div>
        <CountDown :id="nEvent.boxofficeId" :start-time="date"></CountDown>
        <img :src="getBannerImage(nEvent.production)" alt="" style="max-height: 300px">
        <svg fill="#000000" version="1.1" viewBox="0 0 20.00 11.00" style="width: 450px"
             xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <title>arrow_right [#346]</title>
                <defs></defs>
                <g id="Page-1" fill="none" fill-rule="evenodd" stroke-width="0.0002">
                    <g id="Dribbble-Light-Preview" fill="#f9f9f9" transform="translate(-300.000000, -6643.000000)">
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                            <polygon id="arrow_right-[#346]"
                                     points="264 6488.26683 258.343 6483 256.929 6484.21678 260.172 6487.2264 244 6487.2264 244 6489.18481 260.172 6489.18481 256.929 6492.53046 258.343 6494"></polygon>
                        </g>
                    </g>
                    <text x="0.4" y="5.8" font-size="1.8" fill="black">
                        {{nEvent.hall}}
                    </text>
                </g>
            </g>
        </svg>

    </div>

</template>

<script lang="ts" setup>
import {Movie, NatLabEvent, Production} from "../Api";
import CountDown from "./CountDown.vue";

const props = defineProps<{
    nEvent: NatLabEvent
}>()
const date = new Date(props.nEvent.startDate)

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e:String){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function getBannerImage(production: Production) {
    const i = production.images.HD.filename?.slice(production.images.HD.filename?.lastIndexOf('/') + 1, production.images.HD.filename?.length)
    const url = atob(i as string)
    const x = parseInt(url.slice(url.indexOf("/img")+4, url.indexOf("_orig")))
    return "https://www.natlab.nl/cms_files/system/images/img"+ (x+15)+ "_orig.jpg?media_config_img_id=25";
}
</script>

<style scoped>

</style>