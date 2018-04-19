<template>
  <v-flex xs12>
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        <div class="thumbnail">
          <img :src="image" :title="title" >
        </div>
        {{ description }}
      </v-card-text>
      <v-card-actions>
        <nuxt-link :to="'/Project/' + id">Enlace de Acción</nuxt-link>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>


<script>
export default {
  props: ["image", "title", "description", "id"]
}
</script>

<style scoped>
img {
  height: 400px;
  width: auto;
}
</style>
