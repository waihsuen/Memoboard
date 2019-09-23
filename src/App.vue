<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline">Memoboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <span class="pipe">|</span>
        <router-link to="/trash">Trash Bin</router-link>
      </div>
    </v-app-bar>

    <v-content>
      <transition name="fade">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import VAnimateCss from "v-animate-css";

export default {
  name: "App",
  components: {},
  data: () => ({
    //
  })
};
</script>

<style scoped>
.pipe {
  margin: 0 10px;
}

.enter-active-class {
  transition-property: opacity;
  transition-delay: 2000ms;
  animation-delay: 2000ms;
}

.fade-enter-active {
  transition: opacity 1400ms;
}
.fade-enter {
  opacity: 0;
}

</style>