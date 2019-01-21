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
                 <CommentsFiles :files="comment.files_list"/>
                </v-list-tile-content>
            </template>
            <template>
              <v-text-field label="Comentario" v-model="send.comment" textarea :error-messages="errors.comment"></v-text-field>
              <CommentsFiles :files="this.send.files_list"/>
              <v-btn flat icon color="blue" @click="$refs.file_upload.click()">
                <input type="file" ref="file_upload" style="display: none" @change="uploadFile">
              <v-icon>cloud_upload</v-icon>
            </v-btn>
            <v-btn flat icon color="blue" v-on:click="openDraw">
              <v-icon>brush</v-icon>
            </v-btn>
              <v-btn color="success" v-on:click="saveAction">Enviar</v-btn>

            <v-dialog
                v-model="dialogDraw"
                persistent
                max-width="800"
              >
                <v-card>
                  <v-card-title class="headline">Dibujar</v-card-title>
                  <v-card-text>
                  <VueSignaturePad
                      height="350px"
                      width="800px"
                      ref="draw"
                    />
                  <v-btn color="success" v-on:click="saveDraw">Guardar</v-btn>
                  <v-btn color="error" v-on:click="dialogDraw=false">Cancelar</v-btn>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>
          </v-list>
</template>


<script>
import CommentsFiles from "@/components/CommentsFiles"

export default {
  components: {
    CommentsFiles
  },
  props: {},
  created () {
    this.fetchComments()
    this.timer = setInterval(this.fetchComments, 3000)
  },
  data () {
    return {
      comments: [],
      form: {error: [], success: []},
      errors: {comment: []},
      send: {
        "versionId": this.$route.params.version_id,
        "replyId": "",
        "comment": "",
        "authorId": this.$auth.$state.user.id,
        "files_list": [],
        },
        "dialogDraw": false
      }
    },
  methods: {
    fetchComments: function() {
      this.$axios({
        method: 'get',
        url: '/Comments',
        params: {"filter":{"where":{"versionId":this.$route.params.version_id}}}
      })
      .then(response => {
        this.comments = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
    },
    openDraw: function(){
      this.dialogDraw = true
      
      // Forzo la redimension del canvas
      this.$refs.draw.$el.childNodes[0].width=800
      this.$refs.draw.$el.childNodes[0].height=350

      this.$refs.draw.clearSignature()

      var view3d = document.getElementById('viewerContext').childNodes[0].childNodes[0]

      var gl = view3d.getContext("experimental-webgl", {
        preserveDrawingBuffer: true
      })
      gl.animate()

      this.$refs.draw.fromDataURL(view3d.toDataURL())
      
      /* var context = this.$refs.draw.$el.childNodes[0].getContext('2d');
      context.drawImage(view3d, 0, 0); */
      
    },
    saveDraw: function () {
      // upload

       // helper function: generate a new file from base64 String
      const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1]
        const sliceSize = 1024;
        const byteChars = window.atob(arr[1]);
        const byteArrays = [];

        for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
          let slice = byteChars.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
        }

        return new File(byteArrays, filename, {type: mime});
      }

        let draw =       this.$refs.draw.saveSignature();
        console.log(draw);
        let formData = new FormData();
        let timestamp = new Date().getTime();
        let file = dataURLtoFile(draw.data , timestamp + '-draw-' + this.$route.params.id + '-' + this.$route.params.version_id + ".png")

        formData.append('file', file, file.name)
        this.$axios({
            method: "POST",
            url: "/containers/draws/upload",
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(
            result => {
              // ad File to list
              //console.log(result.data.result.files.file[0])
              this.send.files_list.push(result.data.result.files.file[0])

              
            },
            error => {
              console.log(error)
              console.log('Draw upload fail')
            }
          )

          this.dialogDraw = false
    },
    uploadFile: function(up) {
      // helper function: generate a new file from base64 String
      const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1]
        const sliceSize = 1024;
        const byteChars = window.atob(arr[1]);
        const byteArrays = [];

        for (let offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
          let slice = byteChars.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
        }

        return new File(byteArrays, filename, {type: mime});
      }

        var reader = new FileReader()
        reader.onload = (e) => {
          let formData = new FormData();
          let timestamp = new Date().getTime();
  
          let file = dataURLtoFile(e.target.result , timestamp + '-upload-' + this.$route.params.id + '-' + this.$route.params.version_id + up.target.files[0].name)

          formData.append('file', file, file.name)
          this.$axios({
              method: "POST",
              url: "/containers/uploads/upload",
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }).then(
              result => {
                // ad File to list
                //console.log(result.data.result.files.file[0])
                this.send.files_list.push(result.data.result.files.file[0])

                // Force Reset
                const input = this.$refs.file_upload;
                input.type = 'text';
                input.type = 'file';

                
              },
              error => {
                console.log(error)
                console.log('Draw upload fail')
              }
            )
        }
        reader.readAsDataURL(up.target.files[0])
    },
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
          this.send.files_list= []
          //this.$router.push('/project/' + result.data.id)


        this.$axios({
        method: 'get',
        url: '/Comments',
        params: {"filter":{"where":{"versionId":this.$route.params.version_id}}}
        })
        .then(response => {
          this.comments = response.data;
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
