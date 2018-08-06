<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
            <h2>Editar Proyecto</h2>
            <v-text-field 
                id="nombre" 
                name="nombre" 
                label="Nombre" 
                v-model="project.title"
            ></v-text-field>
            <v-text-field
                id="descripcion"
                name="descripcion"
                label="Descripción"
                v-model="project.description"
                textarea
            ></v-text-field>
            
            <div><img :src="getAPI_URL(project.thumbnail)" :title="project.title"/></div>
            <div>
                <upload-button title="Examinar" :selectedCallback="fileSelectedFunc">
            </upload-button></div>

            <div class="actions">
                <v-btn v-on:click="save">Guardar</v-btn>
            </div>
        </v-card-text>
    </v-layout>
</template>

<script>
import UploadButton from '@/components/UploadButton';
import config from '@/nuxt.config'

export default {
    components: {
      UploadButton
    },
  data() {
    return {
      project: [],
      errors: []
    }
  },
  created() {
    this.$axios
      .$get("/Projects/" + this.$route.params.id)
      .then(response => {
        this.project = response
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    getAPI_URL: function (url){
      return config.axios.browserBaseURL + url;
    },
    fileSelectedFunc(upload) {
        this.project.thumbnail = ''
        this.project.thumbnail = upload[0].upload_response.url
    },
    save() {
        this.$axios
            .$patch("/Projects/" + this.$route.params.id, this.project)
            .then(response => {
                console.log(response);
            });
        
        this.$router.push('/')
        this.$forceUpdate();

        //this.$router.go(-1);
    }
  }
}
</script>
