<template>
    <v-container fluid grid-list-md>
      <h1 class="text-capitalize">{{project.title}} - <span>{{ getCurrentVersionDescription() }}</span></h1>
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
              :label="getCurrentVersionDescription() + ' ' + getCurrentVersionCreate()"
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
                      <CommentsList/>
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
      commitDialog: false,
      currentVersion: {},
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

      this.$axios
      .$get("/Versions/" + this.$route.params.version_id)
      .then(response => {
        this.currentVersion = response;
      })
      .catch(e => {
        console.log(e)
        //this.errors.push(e)
      })
  },
  methods: {
    shareURL: function (){
      // TODO Detectar el dominio... 
      return 'http://cocada:3000' + "/project/" + this.$route.params.id + "/" + this.$route.params.version_id + "/share"
    },
    goShareURL: function(){
      window.location.href=this.shareURL();
    },
    getCurrentVersionDescription: function() {
      return this.currentVersion.description;
    },
    getCurrentVersionCreate: function() {
      let created = new Date(this.currentVersion.createdAt);
      
      return this.str_pad(created.getDay()) + "/" + this.str_pad(created.getMonth()) + "/" + created.getFullYear() + " " + this.str_pad(created.getHours()) + ":" + this.str_pad(created.getMinutes());
    },
    str_pad: function(n) {
      return String("00" + n).slice(-2);
    }
  }
}
</script>

<style scoped>
  .tabs__div {
    min-width: 33%;
  }

  .text-capitalize span {
    font-weight: normal;
    font-style: italic;
    font-size: 0.7em;
  }

  a.downloadOutputFileLink {
    color: #4caf50 !important;
  }
</style>
