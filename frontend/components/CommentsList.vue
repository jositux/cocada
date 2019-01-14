<template>
          <v-list two-line>
            <template v-for="(comment, index) in comments">
              <v-divider />
                <v-list-tile-content>
                  <div>
                  <span v-html="getFecha(comment.createdAt)" class="caption"></span>&nbsp;
                  <strong><span class="author" v-html="comment.author.username" />:</strong>&nbsp;
                  <span v-html="comment.comment" class="caption"></span>
                  </div>
                 <CommentsFiles :id="comment.id"/>
                </v-list-tile-content>
            </template>
            <template>
              <v-text-field label="Comentario" v-model="send.comment" textarea :error-messages="errors.comment"></v-text-field>
              <v-btn color="success" v-on:click="saveAction">Enviar</v-btn>
            </template>
          </v-list>
</template>


<script>
import CommentsFiles from "@/components/CommentsFiles"
export default {
  components: {
    CommentsFiles
  },
  props: [],
  created () {
    /* FALTA FILTER TODO */
    this.$axios
      .$get("/Comments")
      .then(response => {
        this.comments = response;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  data () {
    return {
      comments: [],
      form: {error: [], success: []},
      errors: {comment: []},
      send: {
        "version_id": this.$route.params.version_id,
        "reply_id": "",
        "comment": "",
        "author_id": this.$auth.$state.user.id,
        }
      }
    },
  methods: {
    getFecha: function(fecha) {
      var fechaR = new Date(fecha)
      return (fechaR.getDate() + "-" + (fechaR.getMonth()+1) +  "-" + (fechaR.getFullYear())  + " " + fechaR.getHours() + ":" + fechaR.getMinutes())
    },
    validateForm() {
      this.errors.comment = []
      if (this.send.comment.length == 0) {
        this.errors.comment.push('El comentario no puede estar vacío.')
      }
    },
    saveAction () {
      this.validateForm();
      
      this.$axios.post('/Comments', this.send)
      .then( result => {
          this.form.success = 'Enviado'
          this.send.comment = ''
          this.form = {}
          this.errors = {}
          //this.$router.push('/project/' + result.data.id)


        /* FALTA FILTER TODO */
        this.$axios
          .$get("/Comments")
          .then(response => {
            this.comments = response;
          })
          .catch(e => {
            this.errors.push(e);
          });



          },
          error => {
              console.log(error)
              console.log('save fail')
          }
      )
      
      this.$forceUpdate();
    }
	} 
}
</script>

<style>
  .list__tile__content {
    justify-content: initial;
  }

  .list--two-line .list__tile,
  .list__tile--avatar {
    height: auto;
  }
</style>
