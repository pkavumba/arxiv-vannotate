<template>
  <v-card style="font-size: 16pt" tile>
    <v-card-title>Select text to vAnnotate</v-card-title>

    <p class="px-2 pb-2">
      <a href="/">arXiv vAnnotate</a> uses
      <a href="https://www.arxiv-vanity.com" target="_blank">arXiv Vanity</a> to
      render academic papers from
      <a href="https://arxiv.org/" target="_blank">arXiv</a> as responsive web
      pages.
      <a v-bind:href="paper.arxiv_url" class="ml-1" target="_blank"
        >Read this paper on arXiv.org.</a
      >
    </p>
  </v-card>
</template>

<script>
export default {
  props: ["paper"],
};
</script>

<style></style>
