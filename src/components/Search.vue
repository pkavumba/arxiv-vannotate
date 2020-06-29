<template>
  <v-text-field
    :class="visibility"
    ref="search"
    flat
    solo-inverted
    hide-details
    v-model="query"
    prepend-inner-icon="mdi-magnify"
    label="Search"
    placeholder="Search using arXiv id. For example 1907.1169"
    :rules="[(v) => re.test(v) || 'Item is required']"
    :error="error"
    @keyup.enter="convert"
  />
</template>

<script>
export default {
  name: "Search",
  props: { visibility: { type: String, default: "d-none d-sm-flex" } },
  data: () => ({
    query: "",
    arxivId: "",
    error: false,
    re: /(?<id>[a-z-]+(?:\.[a-z]{2})?\/\d{7}|\d+\.\d+)(?<version>v\d+)?/i
  }),
  methods: {
    convert() {
      if (this.re.test(this.query)) {
        this.setArxivId();
        if (this.$route.query.arxiv_id === this.arxivId) {
          //do nothing
        } else {
          this.$router.push({
            name: "Paper",
            query: { arxiv_id: this.arxivId }
          });
        }
      } else {
        this.error = true;
      }
    },
    setArxivId() {
      //console.log(this.re.test(this.query));
      let matchObj = this.re.exec(this.query);
      //console.log(matchObj.groups.version);
      if (matchObj.groups.id) {
        this.arxivId = matchObj.groups.id;
      }
    }
  }
};
</script>
