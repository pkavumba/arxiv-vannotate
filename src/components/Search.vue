<template>
  <v-text-field
    class="d-none d-sm-flex"
    ref="search"
    flat
    solo-inverted
    hide-details
    v-model="arxivId"
    prepend-inner-icon="mdi-magnify"
    label="Search"
    placeholder="Search using arXiv id. For example 1907.1169"
    :rules="[(v) => !!v || 'Item is required']"
    :error="error"
    @keyup.enter="convert"
  />
</template>

<script>
export default {
  name: "Search",

  data: () => ({
    arxivId: "",
    error: false
  }),
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
