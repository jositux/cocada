<template>
  <ProjectFull :project="this.project"/>
</template>
<script>
import ProjectFull from "@/components/ProjectFull"

export default {
  components: {
    ProjectFull
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
  }
}
</script>
