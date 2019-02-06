<template>
  <v-flex xs12>
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <div class="thumbnail">
          <nuxt-link :to="'/project/' + id"><div class="imagen" :style='"background-image: url(" + getAPI_URL(image) + ");"' :title="title"></div></nuxt-link>
        </div>
        <div class="description">
          {{ description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <nuxt-link :to="'/project/' + id">
          <v-btn fab dark small color="primary">
            <v-icon dark>visibility</v-icon>
          </v-btn>
        </nuxt-link>
        <nuxt-link :to="'/project/' + id + '/edit'">
          <v-btn fab dark small color="grey">
            <v-icon dark>edit</v-icon>
          </v-btn>
        </nuxt-link>
        <nuxt-link :to="'/project/' + id + '/remove'">
          <v-btn fab dark small color="grey">
            <v-icon dark>delete</v-icon>
          </v-btn>
        </nuxt-link>
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
.imagen {
  height: 500px;
  width: 500px;
  background-position: center center;
  background-size: auto 100%;
}

.description{
  padding: 10px;
  min-height: 70px;
  max-height: 70px;
  max-width: 500px;
  overflow: hidden;
}

.card__actions{
  top: 79%;
  right: 20px;
  position:absolute;
}

a {
  color: transparent;
}
</style>
