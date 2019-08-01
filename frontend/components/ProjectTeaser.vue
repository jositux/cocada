<template>

  <v-flex>
    <v-card class="teaser-row">
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <div class="thumbnail">
          <nuxt-link :to="'/project/' + id">
          <img class="imagen" :src= getAPI_URL(image) :title="title"></img> 

          </nuxt-link>
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
  width: 100%;
}

.description{
  padding: 10px;
  min-height: 70px;
  max-height: 70px;
  max-width: 500px;
  overflow: hidden;
}

.teaser-row {
  margin-top: 20px;
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
