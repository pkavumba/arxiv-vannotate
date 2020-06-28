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
      <v-row align="center" justify="center">
        <v-col
          cols="12"
          sm="8"
          v-html="paperHTML"
          style="font-size: 20pt"
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
//var showdown = require("showdown");

import annotator from "annotator";

import vanityApi from "../mixins/api.js";

export default {
  name: "Home",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | arXiv-vannotate",
  },
  components: {},
  mixins: [vanityApi],
  data: () => ({
    paperHTML: "",
    loading: true,
    alert: false,
    alertMessage: "",
    app: "",
    renderStateURL: "",
    paper: {},
  }),
  props: { arxiv_id: String },
  mounted() {
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
  },
  methods: {
    ...mapMutations(["setPreviousId", "setPreviousPaper", "setPaper"]),
    fetch() {
      this.loading = true;
      if (this.arxiv_id == this.previousId) {
        this.updatePage(this.previousPaper);
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
      this.addStyle(data.styles);
      this.loadjscssfile(data.links, "css");
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
      this.app = new annotator.App();
      this.app.include(annotator.ui.main, {
        element: document.getElementById("ltx_page_main_2020"),
        editorExtensions: [annotator.ui.tags.editorExtension],
        viewerExtensions: [
          //annotator.ui.markdown.viewerExtension,
          annotator.ui.tags.viewerExtension,
          annotator.ui.tags.editorExtension,
        ],
      });
      this.app.start();
    },
    addStyle(styles) {
      /* Create style document */
      //document.getElementsByTagName("head")[0].appendChild(styles);
    },
    loadjscssfile(filename, filetype) {
      if (filetype == "js") {
        //if filename is a external JavaScript file
        let fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
      } else if (filetype == "css") {
        //if filename is an external CSS file
        let fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
      }
      if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
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
.ltx_page_main .ltx_table {
  margin: 4rem 0;
  max-width: 100%;
  overflow-x: auto;
}
.ltx_page_main .ltx_table .ltx_caption {
  margin-top: 1em;
}
.ltx_page_main .ltx_tabular {
  font-family: Helvetica Neue, Helvetica, sans-serif;
  font-size: 12px !important;
  border-collapse: collapse;
  margin: 2em 0;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .ltx_page_main .ltx_tabular {
    font-size: 14px !important;
  }
}
@media (min-width: 1024px) {
  .ltx_page_main .ltx_tabular {
    font-size: 16px !important;
  }
}
.ltx_page_main .ltx_tabular .ltx_td,
.ltx_page_main .ltx_tabular .ltx_th {
  padding: 0.3em 0.8em !important;
}
@media (min-width: 768px) {
  .ltx_page_main .ltx_tabular .ltx_td,
  .ltx_page_main .ltx_tabular .ltx_th {
    padding: 0.5em 0.8em !important;
  }
}
.ltx_page_main .ltx_tabular .ltx_td.ltx_align_justify,
.ltx_page_main .ltx_tabular .ltx_th.ltx_align_justify {
  text-align: left;
}
.ltx_page_main .ltx_tabular .ltx_border_t {
  border-top: 1px solid #000;
}
.ltx_page_main .ltx_tabular .ltx_border_r {
  border-right: 1px solid #000;
}
.ltx_page_main .ltx_tabular .ltx_border_b {
  border-bottom: 1px solid #000;
}
.ltx_page_main .ltx_tabular .ltx_border_l {
  border-left: 1px solid #000;
}
.ltx_page_main .ltx_tabular .ltx_border_tt {
  border-top: 1px solid #000;
}
.ltx_page_main .ltx_tabular .ltx_border_rr {
  border-right: 1px solid #000;
}
.ltx_page_main .ltx_tabular .ltx_border_bb {
  border-bottom: 1px solid #000;
}
.ltx_page_main .ltx_tabular .ltx_border_ll {
  border-left: 1px solid #000;
}
.ltx_page_main .ltx_tabular .ltx_border_T {
  border-top: 1px solid grey;
}
.ltx_page_main .ltx_tabular .ltx_border_R {
  border-right: 1px solid grey;
}
.ltx_page_main .ltx_tabular .ltx_border_B {
  border-bottom: 1px solid grey;
}
.ltx_page_main .ltx_tabular .ltx_border_L {
  border-left: 1px solid grey;
}
.ltx_page_main .ltx_theorem {
  margin-top: 2em;
  margin-bottom: 2em;
}
.ltx_page_main .ltx_theorem .ltx_title_theorem {
  font-family: "Computer Modern Serif", Georgia, serif;
  font-size: 16px !important;
  line-height: 1.5;
}
</style>
