<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
            <h2>Eliminar el Proyecto</h2>
            ¿Esta seguro de eliminar el proyecto "{{ project.title }}"?
            <v-btn class="ml-3" variant="danger" @click="removeAction()">Eliminar</v-btn>
            <v-btn class="ml-3" variant="danger" @click="cancelAction()">Cancelar</v-btn>
        </v-card-text>
    </v-layout>
</template>


<script>

export default {
   data() {
    return {
      project: [],
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
      removeAction() {
          this.$axios
            .$delete("/Projects/" + this.$route.params.id)
            .then(response => {
                console.log(response);
            });
        this.$router.push('/')
        this.$forceUpdate();

        //this.$router.go(-1);
      },
      cancelAction(){
          this.$router.push('/')
      }
  }
}
</script>
