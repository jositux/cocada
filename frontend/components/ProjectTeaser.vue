<template>
  <v-flex xs12>
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <div class="thumbnail">
          <nuxt-link :to="'/project/' + id"><img :src="getAPI_URL(image)" :title="title" ></nuxt-link>
        </div>
        {{ description }}
      </v-card-text>
      <v-card-actions>
        <nuxt-link :to="'/project/' + id">Ver</nuxt-link>
        <nuxt-link :to="'/project/' + id + '/edit'">Editar</nuxt-link>
        <nuxt-link :to="'/project/' + id + '/remove'">Eliminar</nuxt-link>
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
