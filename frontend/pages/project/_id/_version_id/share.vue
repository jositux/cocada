<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap>
    <v-flex xs12>
        
          <v-btn @click="resetCamera">Reset Camera</v-btn>
          <div oncontextmenu="return false;" id="viewerContext"></div>
        
            <div id="parameterContext" style="display:none"></div>
    
          <div id="editFrame" style="display:none;">
            <div id="editor"></div>
          </div>
    </v-flex>
      </v-layout>      
</v-container>
  
</template>

<script>
import config from '@/nuxt.config'
export default {
  middleware: ['auth'],
  options: {
    auth: false
  },
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
    resetCamera(){
      this.gProcessor.resetCamara();
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
    height: 600px;/* var(window_height); */
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


</style>