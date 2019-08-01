<template>
    <v-container fluid grid-list-md>
      <h2 class="text-capitalize">{{project.title}}</h2>
      <v-layout row wrap align-top justify-top row fill-height>
        <v-flex d-flex lg9>
          <div>
            <Viewer/>
          </div>
        </v-flex>
        <v-flex d-flex lg3>
            <div>
              <v-text-field
              outline
              label="Enlace para 
              compartir"
              :value="shareURL()"
              append-icon="share"
              :append-icon-cb="goShareURL"
            ></v-text-field>
            


               <v-tabs icons-and-text centered light>
                  <v-tabs-slider color="blue"></v-tabs-slider>
                  <v-tab href="#tab-1">
                    <v-icon small>chat</v-icon>
                  </v-tab>
                  <v-tab href="#tab-2">
                    <v-icon small>history</v-icon>
                  </v-tab>
                  <!--<v-tab href="#tab-3">
                    <v-icon small>cloud_upload</v-icon>
                  </v-tab>-->
                  <v-tab-item id="tab-1">
                    <v-card flat>
                      <CommentsList :background="getScreenShot"/>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item id="tab-2">
                    <v-card flat>
                      <VersionList/>
                    </v-card>
                  </v-tab-item>
                  <!--<v-tab-item id="tab-3">
                    <v-card flat>
                      <FileList title="Subir archivos"/>
                    </v-card>
                  </v-tab-item>-->
                </v-tabs>
            </div>
        </v-flex>
      </v-layout>
    </v-container>
</template>


<script>
import CommentsList from "@/components/CommentsList"
import VersionList from "@/components/VersionList"
import FileList from "@/components/FileList"
import Viewer from "@/components/Viewer"
import config from '@/nuxt.config'

export default {
  components: {
    Viewer,
    CommentsList,
    VersionList,
    FileList,
  },
  data() {
    return {
      project: {},
      errors: [],
      commitDialog: false
    };
  },
  created() {
    this.$axios
      .$get("/Projects/" + this.$route.params.id)
      .then(response => {
        this.project = response;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    shareURL: function (){
      // TODO Detectar el dominio... 
      return 'http://cocada:3000' + "/project/" + this.$route.params.id + "/" + this.$route.params.version_id + "/share"
    },
    goShareURL: function(){
      window.location.href=this.shareURL();
    }
  }
}
</script>

<style scoped>
  .tabs__div {
    min-width: 33%;
  }
</style>
