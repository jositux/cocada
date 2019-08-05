<template>
  <v-app light>
    <!--<v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>-->
    <v-toolbar fixed app :clipped-left="clipped">
      <!--<v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn>-->
      
        <v-toolbar-title class="main-title">
          <a @click="goHome">CoCADa</a>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <UserSessionIndicator />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import UserSessionIndicator from '@/components//UserSessionIndicator';
export default {
  components: {
    UserSessionIndicator
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: "apps", title: "Proyectos", to: "/" },
        { icon: "help", title: "Acerca de", to: "/about" }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "CoCADa"
    }
  },
  methods: {
    goHome: function(){
      // Forece full reload
      window.location.href='/';
    }
  }
}
</script>

<style scoped>
.main-title a {
  color: black;
  text-decoration: none;
}
</style>