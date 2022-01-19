<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png"
          transition="scale-transition"
          width="120"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn fab href="https://github.com/HuakunShen/shopify-2022-frontend-challenge">
        <v-avatar>
          <img src="https://avatars.githubusercontent.com/u/33727687?v=4" alt="huakun" />
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
