<template>
<p> Redirigiendo.... </p>
</template>

<script>
export default {
  data() {},
  mounted() {
    this.$axios
      .$get("/Projects/" + this.$route.params.id)
      .then(response => {
        //this.$router.push('/project/' + this.$route.params.id + "/" + response._lastVersion.id)
        // force full update
        window.location.href = '/project/' + this.$route.params.id + "/" + response._lastVersion.id;
      })
      .catch(e => {
        console.log(e)
        //this.errors.push(e)
      })
  }
}
</script>
