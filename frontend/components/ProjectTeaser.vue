<template>
  <v-flex xs12>
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <div class="thumbnail">
          <img :src="getAPI_URL(image)" :title="title" >
        </div>
        {{ description }}
      </v-card-text>
      <v-card-actions>
        <nuxt-link :to="'/Project/' + id">Ver</nuxt-link>
        <nuxt-link :to="'/Project/' + id + '/edit'">Editar</nuxt-link>
        <nuxt-link :to="'/Project/' + id + '/remove'">Eliminar</nuxt-link>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
import config from '../nuxt.config'

export default {
  props: ["image", "title", "description", "id"],
  methods: {
    getAPI_URL: function (url){
      return config.axios.browserBaseURL + url;
    }
  }
}
</script>

<style scoped>
img {
  height: 400px;
  width: auto;
}
</style>
