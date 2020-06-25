<template>
  <v-row>
    <v-col cols="12" v-if="loading">
      <div class="text-center">
        <v-progress-circular :size="70" color="primary" indeterminate></v-progress-circular>
      </div>
    </v-col>
    <v-col cols="12" v-if="loading">
      <h2
        class="text-center"
      >Converting the paper {{arxiv_id}} to HTML. This should take less than a minute.</h2>
    </v-col>

    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" v-html="paper" style="font-size: 20pt"></v-col>
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
import axios from "axios";

export default {
  name: "Home",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s | arXiv-vannotate"
  },
  components: {},
  mixins: [],
  data: () => ({
    paper: "",
    loading: true,
    alert: false,
    alertMessage: "",
    baseUrl: "https://arxiv-vanity-restful-api.herokuapp.com"
  }),
  props: { arxiv_id: String },
  computed: {
    url() {
      return `${this.baseUrl}/api/renders/2/render/?arxiv_id=${this.arxiv_id}`;
    }
  },
  mounted() {
    this.fetchPaper();
  },
  watch: {
    arxiv_id: function() {
      this.fetchPaper();
    }
  },
  methods: {
    fetchPaper() {
      this.loading = true;
      axios
        .get(
          `${this.baseUrl}/api/renders/2/render/?arxiv_id=${this.arxiv_id}`,
          {
            headers: {
              Accept: "*/*"
            }
          }
        )
        .then(res => {
          //console.log(res.data);
          this.alert = false;
          this.loading = false;
          this.paper = res.data.rendered;
          this.addStyle(res.data.styles);
          this.loadjscssfile(res.data.links, "css");
          //
        })
        .catch(error => {
          //console.log(error);
          this.loading = false;
          this.alertMessage = error;
          this.alert = false;
          this.paper = "Paper not found or cannot be rendered";
        });
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
    }
  }
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
