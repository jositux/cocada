<template>
    <div>
        <v-chip close small @click="modal=true">
            <a :title="title" class="file-chip">
                <span v-html= "truncateText(name)" />
            </a> 
        </v-chip>
        <v-dialog
            v-model="modal"
            persistent
            max-width="800"
            >
            <v-card>
                <v-card-title class="headline">Imagen</v-card-title>
                <v-card-text>
                <img :src="url"/>
                <v-btn color="success" v-on:click="modal=false">Cerrar</v-btn>
                </v-card-text>
            </v-card>
            </v-dialog>
        </div>
</template>
<script>
import config from '../nuxt.config'
export default {
  props: {
      "title": String,
      "url": String,
      "alt": String,
      "name": String,
  },
  data () {
      return {
          modal: false,
      }
  },
  methods: {
      getAPI_URL: function (url){
            return config.axios.browserBaseURL + url;
      },
      truncateText: function(filename) {
			return filename.substring(0,4) + '...' + filename.slice(-8)
		},
  }
}
</script>
