<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap>
    <v-flex xs8>
        <v-flex xs12>
          <v-btn v-if="!instantUpdate" @click="do_update" >Actualizar</v-btn>
          <!--<v-btn @click="resetParameters" color="primary">Reiniciar Parámetros <v-icon right dark>autorenew</v-icon></v-btn>-->
          <!--<v-btn @click="resetCamera">Reset Camera</v-btn>-->
          
          
          <div oncontextmenu="return false;" id="viewerContext"></div>
        </v-flex>

        <v-btn @click="resetCamera" fab dark small color="primary" class="reload-camera" title="Reset Vista"><v-icon dark>replay</v-icon></v-btn>

        <v-flex xs12>
            <div id="parameterContext"></div>
            <v-btn @click="resetParameters" fab dark small color="primary" title="Valor por defecto"><v-icon dark>autorenew</v-icon></v-btn>
        </v-flex>

        
    </v-flex>

    <v-flex xs4 v-bind:class="{ editorHide: editor_hide  }">
          <div id="editFrame">
            <div id="editor"></div>
          </div>
          <!--<v-btn @click="toogleEditor" fab dark small color="primary"><v-icon right dark>remove_red_eyes</v-icon></v-btn>-->
          <v-btn @click="openCommit" color="primary">Nueva Versión<v-icon right dark>add</v-icon></v-btn>
    </v-flex>
      </v-layout>
      
      <v-dialog
      v-model="commitDialog"
      persistent
      max-width="800"
    >
      <v-card class="new-version">
        <!--<v-card-title class="headline">Guardar el proyecto</v-card-title>-->
          <v-alert v-if="version_error"
              :value="true"
              color="error"
              >
              {{this.version_error}}
              </v-alert>
          <v-card-text>
          <v-alert v-if="version_success"
            :value="true"
            color="success"
            >
            {{this.version_success}}
          </v-alert>
          <div>
            <v-text-field
                id="descripcion"
                name="descripcion"
                label="Breve Descripción de los Cambios"
                v-model="version.description"
                textarea
            ></v-text-field>
            <img :src="version.screenshot"/>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            @click="commitDialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary"
            @click="commitAction"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-container>
  
</template>

<script>
import config from '../nuxt.config'
export default {
  props: {},
  data () {
    return {
        instantUpdate: true,
        CAD_defaultFile: 'CoCADa.jscad', // Used in export. TODO: ¿why not work?
        CAD_code: "",
        editor_hide: false,
        projectId: '',
        version_success: '',
        version_error: '',
        version: {
          projectId: '',
          parentVersionId: '',
          description: '',
          image: '',
          screenshot: null, /* RAW Image, fill image with upload url.*/
          jscadCode: '',
          authorId: '',
        },
        commitDialog: false
      }
  },
  created () {
    // store url params
    this.projectId = this.$route.params.id
    this.versionId = this.$route.params.version_id
  },
  mounted () {
    this.$axios
      .$get("/Versions/" + this.$route.params.version_id)
      .then(response => {
        this.CAD_code = response.jscadCode

        // Load openscad
        const Processor = require("~/commons/cocada_openjscad.js")
        const Editor = require("@jscad/openjscad/src/ui/editor")  

        // Set processor
        this.gProcessor = new Processor(document.getElementById('viewerContext'), document.getElementById('parameterContext'))
        this.gProcessor.createElements()

        // Set Editor
        this.gEditor = Editor.setUpEditor('editor', this.gProcessor)
        Editor.putSourceInEditor(this.gEditor, this.CAD_code)
        
        // Update Viewer
        this.gProcessor.setJsCad(this.CAD_code, this.CAD_defaultFile)

        // Javscript listener to update Vue model on user change.
        document.getElementById("editor").firstChild.addEventListener("keyup", this.updateCode)
        //this.gProcessor.onchange = this.updateInstant;
        this.gProcessor.instantUpdate_onChange = this.updateInstant;
      })
      .catch(e => {
        console.log(e)
        //this.errors.push(e)
      })
    
    },
  methods: {
    getAPI_URL: function (url){
      return config.axios.browserBaseURL + url;
    },
    openCommit() {
      // Clean Data
      this.version.projectId = this.projectId
      this.version.description = ''
      this.version.screenshot = this.gProcessor.captureScreenshot()
      this.commitDialog = true;
    },
    commitAction() {
      /* Upload RAW image and set url */
      
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

        let formData = new FormData();
        let timestamp = new Date().getTime();
        let file = dataURLtoFile(this.version.screenshot, timestamp + '-screenshot-' + this.projectId + ".png")
        
        formData.append('file', file, file.name)
        this.$axios({
            method: "POST",
            url: "/containers/screenshots/upload",
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(
            result => {
              let response = new Object;
              response.filename = result.data.result.files.file[0].name
              response.container = result.data.result.files.file[0].container
              this.version.image = '/containers/' + result.data.result.files.file[0].container + '/download/' + result.data.result.files.file[0].name
              //this.version.screenshot = this.version.image;


               /* get new jsCadCode */
              this.version.jscadCode =  this.gProcessor.getNewScript();
              
              /* Commit */
              let data = this.version;
              data.authorId = this.$auth.$state.user.id
              delete data['screenshot']
              
              this.$axios.post('/versions', data)
                        .then( result => {
                            //this.success = 'Version Creado'
                            //this.$router.push('/project/' + result.data.id)
                            this.version_success = 'Guardado correcto, nueva versión ' + result.data.id
                            this.commitDialog = false;
                            //this.$router.push('/project/' + this.$route.params.id + "/" + result.data.id)
                            // force full update
                            window.location.href = '/project/' + this.$route.params.id + "/" + result.data.id
                            },
                            error => {
                                console.log(error)
                                console.log('Save version fail')
                                this.version_error = 'Problemas al guardar'
                            }
                        )
            },
            error => {
              console.error('error: ' + error)
            }
          )
    },
    resetCamera(){
      this.gProcessor.resetCamara();
    },
    updateInstant() {
      // Mantiene actualizado el estado del checkbox instant update en openscad y nuxt.
      this.instantUpdate = document.getElementById('instantUpdate').checked
    },
    updateCode() {
      // Manitiene actualizado el código entre openscad y nuxt
      this.CAD_code = this.gEditor.getValue();
      if (this.instantUpdate === true) {
        this.do_update()
      }
    },
    do_update(){
      this.gProcessor.setJsCad(this.gEditor.getValue(), this.CAD_defaultFile)
    },
    resetParameters(){
      // Reset user input values
      this.gProcessor.paramControls = []
      this.gProcessor.setJsCad(this.gEditor.getValue(), this.CAD_defaultFile)
    },
    toogleEditor() {
      this.editor_hide = !this.editor_hide;
    },
    cssProps () {
      return {
        window_width: window.innerWidth,
        window_height: window.innerHeight,
      }
    },
  },
}
</script>

<style scoped>
  #editFrame {
  /*  display: none; */
    width: 100%;
    font-weight: normal;
  }

  /*#editHandle {
  }*/

  #editFrame {
    transition: width 0.4s;
    -o-transition: width 0.4s;
    -moz-transition: width 0.4s;
    -webkit-transition: width 0.4s;
  }

  .ace_gutter {
    border-left: 1px solid #ccc;
    background: transparent !important;
  }

  #editor {
    z-index: 0;
    width: 100%;
    min-height: 500px;
  }

  #viewerContext {
    /* ensure that the canvas uses the whole width and height of the document */
    background: white;
    height: 500px;/* var(window_height); */
    width: 100%;
  }

  #parametersdiv {
    height: 350px;
  }

  #statusdiv {
    margin-top: 15px;
  }

  #errordiv{
    margin-top: 15px;
    color: red;
  }
  canvas {
    height: 100%;
    width: 100%;
    cursor: move;
  }

  .editorHide{
    display: none;
  }

  .reload-camera {
    float: right;
    margin-top: -100px;
  }

  .new-version img {
    max-width: 100%;
  }

</style>

