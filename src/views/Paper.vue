<template>
  <v-row>
    <v-col cols="12" v-if="loading">
      <div class="text-center">
        <v-progress-circular
          :size="70"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-col>
    <v-col cols="12" v-if="loading">
      <div class="text-center">
        Converting the paper
        <span class="text-decoration-underline">"{{ paperTitle }}"</span> to
        HTML. This should take less than a minute.
      </div>
    </v-col>

    <v-col cols="12">
      <v-row v-if="!loading" align="center" justify="center">
        <v-col cols="12" sm="8">
          <credit-bar v-bind:paper="paper"></credit-bar>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row align="center" justify="center">
        <v-col
          cols="12"
          sm="8"
          v-html="paperHTML"
          id="ltx_page_main_2020"
        ></v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="8" class="text-center">
      <v-alert
        v-model="alert"
        border="left"
        close-text="Close Alert"
        color="red"
        dark
        dismissible
        v-text="alertMessage"
      ></v-alert>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import CreditBar from "../components/Credit";

import annotator from "html-annotator";

import vanityApi from "../mixins/api.js";

export default {
  name: "Home",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | arXiv-vannotate",
  },
  components: { CreditBar },
  mixins: [vanityApi],
  data: () => ({
    paperHTML: "",
    loading: true,
    alert: false,
    alertMessage: "",
    app: "",
    renderStateURL: "",
    paper: {},
    css: "https://dvzfo78yzcghn.cloudfront.net/static/vanity/index.css",
    js: "https://dvzfo78yzcghn.cloudfront.net/static/vanity/index.js",
  }),
  props: { arxiv_id: String },
  mounted() {
    this.loadjscssfile(this.css, "css");
    this.fetch();
  },
  watch: {
    arxiv_id: function() {
      this.paperHTML = "";
      this.paper = {};
      this.fetch();
    },
  },
  computed: {
    paperTitle() {
      return this.paper.title ? this.paper.title : this.arxiv_id;
    },
    ...mapState(["previousId", "previousPaper"]),
    ...mapState({ cachePaper: "paper" }),
  },
  methods: {
    ...mapMutations(["setPreviousId", "setPreviousPaper", "setPaper", "uid"]),
    fetch() {
      this.loading = true;
      if (this.arxiv_id == this.previousId) {
        this.updatePage(this.previousPaper);
        this.paper = this.cachePaper;
      } else {
        this.renderPaper(this.arxiv_id)
          .then((res) => {
            const render_state = res.data.render_state;
            if (render_state === "running" || render_state === "unstarted") {
              this.paper = res.data.paper;
              this.checkState();
            } else if (render_state === "success") {
              this.updatePage(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((error) => {
            this.loading = false;
            this.alertMessage = error;
            this.alert = false;
            if (error.response) {
              this.paperHTML = error.response.data.detail;
            } else {
              this.paperHTML = error;
            }
          });
      }
    },
    updatePage(data) {
      this.alert = false;
      this.loading = false;
      this.paperHTML = data.rendered;
      this.loadjscssfile(this.js, "js");
      this.initAnnotator();
      try {
        this.setPaper(data.paper);
        this.setPreviousPaper(data);
        this.setPreviousId(this.arxiv_id);
      } catch (error) {
        //error setting vuex paper might occur due to local storage size
        //console.log(error);
      }
    },
    initAnnotator() {
      //version 2 touch still under development

      const elem = document.getElementById("ltx_page_main_2020");
      const app = new annotator.App()
        .include(annotator.ui.main, {
          element: elem,
          editorExtensions: [annotator.ui.colorPicker.editorExtension],
        })
        .include(annotator.ui.filter.standalone)
        .include(annotator.storage.localStore);
      //disable http storage
      //.include(annotator.storage.http, {
      //    prefix: `${this.baseUrl}/api`,
      //  });
      app.start().then(() => {
        app.annotations.load({
          uri: window.location.href,
        });
      });
      this.app = app;
    },
    loadjscssfile(filename, filetype) {
      let fileref;
      if (filetype == "js") {
        //if filename is a external JavaScript file
        fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
      } else if (filetype == "css") {
        //if filename is an external CSS file
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
      }
      if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
      }
    },
    checkState() {
      this.renderState(this.arxiv_id)
        .then((res) => {
          if (res.state === "running" || res.state === "unstarted") {
            this.checkStateTimeout();
          } else if (res.state === "success") {
            this.fetch();
          } else {
            this.fetch(); //update page with error state
          }
        })
        .catch((error) => {
          // update page
          this.fetch();
        });
    },
    checkStateTimeout() {
      setTimeout(() => {
        this.checkState();
      }, 2000);
    },
  },
};
</script>
<style>
.annotator-filter {
  display: none;
}
</style>
