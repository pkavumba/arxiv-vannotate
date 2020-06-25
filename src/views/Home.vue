<template>
  <v-row arign="center" justify="center">
    <v-col cols="12" sm="8" class="text-center">
      <v-alert
        v-model="alert"
        border="left"
        close-text="Close Alert"
        color="red"
        dark
        dismissible
      >Enter arXiv ID</v-alert>
    </v-col>

    <v-col cols="12" sm="8">
      <v-text-field
        flat
        solo-inverted
        hide-details
        v-model="arxivId"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        placeholder="Search using arXiv id. For example 1907.1169"
        @keyup.enter.native="convert"
      />
    </v-col>
    <v-col cols="12" sm="8" class="text-center">
      <v-btn text class="primary" @click="convert">Convert to HTML</v-btn>
    </v-col>
    <v-col cols="12" sm="8" class="diplay3">
      <a href="/">arXiv vannotate</a> adds annotations and dark mode to
      <a href="https://www.arxiv-vanity.com/">arXiv Vanity</a>, which renders academic papers from
      <a href="https://arxiv.org/">arXiv</a> as responsive web pages so you don’t have to squint at a PDF.
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | arXiv-Vannotate"
  },
  components: {},
  mixins: [],
  data: () => ({
    arxivId: "",
    alert: false
  }),
  mounted() {
    //console.log("");
  },
  methods: {
    convert() {
      if (this.arxivId) {
        this.alert = false;
        //console.log(this.arxivId);
        this.$router.push({
          name: "Paper",
          query: { arxiv_id: this.arxivId }
        });
      } else {
        this.alert = true;
      }
    }
  }
};
</script>
<style scoped>
</style>
