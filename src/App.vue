<template>
  <v-app id="inspire">
    <nav-bar></nav-bar>
    <v-main>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  props: {
    source: String
  },
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | arxiv-vannotate"
  },
  components: {
    NavBar
  }
};
</script>
