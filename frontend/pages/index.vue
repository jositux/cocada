<template>
  <v-layout row wrap>
    <v-flex lg6 sm4 offset-sm3>
      <v-container fluid grid-list-sm>
        <v-card-text style="position: relative; padding-top: 0px;">
          <v-btn v-if="checkNoAdd()" dark fab absolute top right color="primary"
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
  methods: {
    checkNoAdd () {
      // Los roles de loopback son usadas internamente para ACL
      // TODO: adapt loopback to send role on user/me
      ;
      if (this.$auth.$state.user.username == 'admin' || this.$auth.$state.user.username == 'persona-b') {
        return true;
      }else{
        return false;
      }
    },
  /*asyncData ({ app }) {
    return app.$axios.get("/Projects")
    .then((res) => {
      return { projects: res.data }
    })
  }*/
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Raleway&display=swap');

  .nuevo {
    margin-top: 37px;
  }

  .headline {
    font-family: 'Raleway', sans-serif;
  }
</style>
