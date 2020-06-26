<template>
  <v-row arign="center" justify="center">
    <v-col cols="12" sm="8">
      <v-text-field
        flat
        solo-inverted
        v-model="arxivId"
        prepend-inner-icon="mdi-magnify"
        label="arXiv Id"
        placeholder="Search using arXiv id. For example 1907.1169"
        :rules="[(v) => !!v || 'arXiv Id is required']"
        :error="error"
        @keyup.enter="convert"
      />
    </v-col>
    <v-col cols="12" sm="8" class="text-center">
      <v-btn text class="primary" @click="convert">Convert to HTML</v-btn>
    </v-col>
    <v-col cols="12" sm="8" class="diplay3">
      <a href="/">arXiv vannotate</a> adds annotations and dark mode to
      <a href="https://www.arxiv-vanity.com/">arXiv Vanity</a>, which renders
      academic papers from
      <a href="https://arxiv.org/">arXiv</a> as responsive
      web pages so you don’t have to squint at a PDF.
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import SearchBar from "../components/Search";
export default {
  name: "Home",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | arXiv-Vannotate"
  },
  components: {},
  mixins: [],
  data: () => ({ arxivId: "", error: false, error_msg: "" }),
  mounted() {
    //console.log("");
  },
  methods: {
    convert() {
      if (this.arxivId) {
        this.$router.push({
          name: "Paper",
          query: { arxiv_id: this.arxivId }
        });
      } else {
        this.error = true;
      }
    }
  }
};
</script>
<style scoped></style>
