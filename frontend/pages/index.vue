<template>
  <v-layout row wrap>
    <v-flex lg6 sm4 offset-sm3>
      <v-container fluid grid-list-sm>
        <v-card-text style="position: relative; padding-top: 0px;">
          <v-btn dark fab absolute top right color="primary"
          href="project/new"
          title="Crear uno nuevo"
          class="nuevo">
            <v-icon>add</v-icon> 
        </v-btn>
        </v-card-text>
        
        <v-layout wrap>
        <div v-for="item in projects" :key="item.id">
          <ProjectTeaser :id="item.id" :image="item._lastVersion.image" :title="item.title" :description="item.description" />
        </div>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>

</template>

<script>
import ProjectTeaser from "@/components/ProjectTeaser"
export default {
  components: {
    ProjectTeaser
  },
  data() {
    return {
      projects: [],
      errors: []
    }
  },
  mounted() {
    this.$axios
      .$get("/projects")
      .then(response => {
        this.projects = response.reverse()
      })
      .then(response => {
        this.projects = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  /*asyncData ({ app }) {
    return app.$axios.get("/Projects")
    .then((res) => {
      return { projects: res.data }
    })
  }*/
}
</script>

<style scoped>
  .nuevo {
    margin-top: 30px;
  }
</style>
