<template>
  <v-row arign="center" justify="center">
    <v-col cols="12" sm="8">
      <search-bar :visibility="'x'" ref="search"></search-bar>
    </v-col>
    <v-col cols="12" sm="8" class="text-center">
      <v-btn text class="primary" @click="convert">Convert to HTML</v-btn>
    </v-col>
    <v-col cols="12" sm="8" v-if="paper">
      Continue reading
      <router-link :to="{ name: 'Paper', query: { arxiv_id: paper.arxiv_id } }">"{{ paper.title }}"</router-link>
    </v-col>
    <v-col cols="12" sm="8" v-else>
      For example
      <router-link
        :to="{ name: 'Paper', query: { arxiv_id: examples[0].arxiv_id } }"
      >"{{ examples[0].title }}"</router-link>
    </v-col>
    <v-col cols="12" sm="8" class="diplay3">
      <a href="/">arXiv vAnnotate</a> adds annotations and dark mode to
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
import { mapState } from "vuex";

export default {
  name: "Home",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | arXiv-Vannotate"
  },
  components: { SearchBar },
  mixins: [],
  data: () => ({
    error: false,
    error_msg: "",
    examples: [
      {
        title: "RoBERTa: A Robustly Optimized BERT Pretraining Approach",
        arxiv_id: "1907.11692"
      }
    ]
  }),
  computed: {
    ...mapState(["paper"]),
    example() {
      return examples[Math.floor(Math.random() * examples.length)];
    }
  },
  methods: {
    convert() {
      this.$refs.search.convert();
    }
  }
};
</script>
<style scoped></style>
