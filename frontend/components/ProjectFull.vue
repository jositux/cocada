<template>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs9>
          <div>
            <Viewer/>
          </div>
        </v-flex>
        <v-flex d-flex xs3>
            <div>
               <v-tabs icons-and-text centered light>
                  <v-tabs-slider color="yellow"></v-tabs-slider>
                  <v-tab href="#tab-1">
                    <v-icon small>chat</v-icon>
                  </v-tab>
                  <v-tab href="#tab-2">
                    <v-icon small>history</v-icon>
                  </v-tab>
                  <v-tab href="#tab-3">
                    <v-icon small>cloud_upload</v-icon>
                  </v-tab>
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
                  <v-tab-item id="tab-3">
                    <v-card flat>
                      <FileList title="Subir archivos"/>
                    </v-card>
                  </v-tab-item>
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
  getScreenShot() {
    return 'holis'
  }
  /*computed: {
    computedCode(){
      console.log('computedCode');
    }
  }*/
}
</script>

<style scoped>
  .tabs__div {
    min-width: 33%;
  }
</style>
