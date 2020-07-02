<template>
  <v-row align="center" justify="center">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <section id="firebaseui-auth-container"></section>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  components: {},
  computed: {
    nexturl: function() {
      if (this.$route.query.nextUrl) {
        return this.$route.query.nexturl;
      } else {
        return "/";
      }
    }
  },
  mounted() {
    //console.log(this.$route.query.nextUrl);

    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: this.nexturl, // This redirect can be achived by route using callback.
      signInFlow: "popup",
      autoUpgradeAnonymousUsers: true,
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: "/privacy",
      // Privacy policy url/callback.
      privacyPolicyUrl: function() {
        window.location.assign("/privacy");
      },
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          var user = authResult.user;
          var credential = authResult.credential;
          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var providerId = authResult.additionalUserInfo.providerId;
          var operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        signInFailure: function(error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          return handleUIError(error);
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          //document.getElementById("loader").style.display = "none";
        }
      }
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.push("/profile");
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>

<style scoped></style>
