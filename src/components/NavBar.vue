<template>
  <div class="text-decoration-none">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      :expand-on-hover="miniVariant"
      :mini-variant="miniVariant"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else-if="item.link" :key="item.text" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar v-if="item.new">
              <v-badge color="blue" class="align-self-center">
                <template v-slot:badge>
                  <span>new</span>
                </template>
                <v-icon large color="grey"></v-icon>
              </v-badge>
            </v-list-item-avatar>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      app
      color="blue darken-3"
      dark
      :clipped-right="$vuetify.breakpoint.mdAndUp"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">arXiv-Vannotate</span>
      </v-toolbar-title>
      <search-bar></search-bar>
      <v-spacer />
      <v-list class="text-primary mr-sm-10" id="darkTheme">
        <v-list-item>
          <v-list-item-title>Dark Mode</v-list-item-title>
          <v-list-item-action id="darkSwitch">
            <v-switch v-model="darkMode" color="white"></v-switch>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <!--<v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="darkMode" class="mr-2"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Dark Mode</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>No notifications</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon large @click.stop="authDialog = true">
        <v-icon>mdi-account</v-icon>
      </v-btn>-->
    </v-app-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SearchBar from "./Search";

export default {
  props: {
    source: String
  },
  components: { SearchBar },
  data: () => ({
    authDialog: false,
    miniVariant: true,
    dialog: false,
    drawer: null,
    snackbar: false,
    snackbarMessage: "",
    right_drawer: null,
    notifications: false,
    arxivId: "",
    items: [
      { icon: "mdi-home", text: "Home", link: "/" },
      { icon: "mdi-help-circle", text: "Help", link: "/help" }
    ]
  }),
  mounted() {
    //hack because vuetify won't honor props
    this.$vuetify.theme.dark = this.darkTheme;
    const darkEL = document.getElementById("darkTheme");
    const darkSwitch = document.getElementById("darkSwitch");
    darkEL.classList.remove("theme--dark");
    darkSwitch.querySelector(":scope > div").classList.remove("theme--dark");
  },
  computed: {
    ...mapState(["darkTheme"]),
    darkMode: {
      // getter
      get: function() {
        return this.darkTheme;
      },
      // setter
      set: function(val) {
        this.$vuetify.theme.dark = val;
        this.changeDarkMode(val);
      }
    }
  },
  methods: {
    ...mapMutations(["changeDarkMode"]),
    convert() {
      if (this.arxivId) {
        this.alert = false;
        const arxiv_id = this.arxivId;
        this.arxivId = "";
        //console.log(this.arxivId);
        this.$router.push({
          name: "Paper",
          query: { arxiv_id: arxiv_id }
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
