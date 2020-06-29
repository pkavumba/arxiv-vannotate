<template>
  <v-text-field
    :class="visibility"
    ref="search"
    flat
    solo-inverted
    :hide-details="hide_error_details"
    v-model="query"
    prepend-inner-icon="mdi-magnify"
    label="Search"
    placeholder="Search using any string or url with arXiv id"
    :rules="[(v) => re.test(v) || 'arXiv ID is required']"
    :error="error"
    @keyup.enter="convert"
  />
</template>

<script>
export default {
  name: "Search",
  props: {
    visibility: { type: String, default: "d-none d-sm-flex" },
    hide_error_details: { type: Boolean, default: true }
  },
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
        if (this.$route.params.arxiv_id === this.arxivId) {
          //do nothing
        } else {
          this.$router.push({
            name: "Paper",
            params: { arxiv_id: this.arxivId }
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
