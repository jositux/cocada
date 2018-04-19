<template>
  <v-layout row wrap>
    <div v-for="item in projects" :key="item.id">
      <ProjectTeaser :id="item.id" :image="item.thumbnail" :title="item.title" :description="item.description" />
    </div>
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
  created() {
    this.$axios
      .$get("/Projects")
      .then(response => {
        this.projects = response
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
