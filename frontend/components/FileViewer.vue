<template>
    <div v-if="!close">
        <v-chip v-if="showFileInModal(this.mime)" :close="this.files_editable" small @click="modal=true" @input="removeFile">
           {{truncateText(name)}}
        </v-chip>
        <v-chip v-else :close="this.files_editable" small @input="removeFile">
           <a :href="url">{{truncateText(name)}}</a>
        </v-chip>
        <v-dialog
            v-model="modal"
            persistent
            max-width="850"
            >
            <v-card>
                <!--<v-card-title class="headline">Imagen</v-card-title>-->
                <!--<v-card-text>-->
                <img :src="url"/>
                <!--<v-btn style="position: relative; right: 10px; top: 10px;" color="primary" v-on:click="modal=false">Cerrar</v-btn>-->
                <v-btn @click="modal=false" fab dark small color="primary" class="btn-close" title="Cerrar"><v-icon dark>close</v-icon></v-btn>
                <!--</v-card-text>-->

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
      "index": Number,
      "onClose": Function,
      "files_editable": Boolean,
      "mime": String,
  },
  data () {
      return {
          modal: false,
          close: false, 
      }
  },
  created() {
      console.log(this.files_editable);
  },
  methods: {
      getAPI_URL: function (url){
            return config.axios.browserBaseURL + url;
      },
      truncateText: function(filename) {
			return filename.substring(0,4) + '...' + filename.slice(-8)
        },
      removeFile: function(e){
          this.close = true;
          this.onClose(this.index);
      },
      showFileInModal: function (mime) {
            return (mime == 'image/jpeg' || mime == 'image/png' || mime == 'image/gif' || mime == 'image/bmp')
      },
  }
}
</script>
