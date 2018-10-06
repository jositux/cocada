<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap>
    <v-flex xs8>
        <v-flex xs12>
          <v-btn v-if="!instantUpdate" @click="do_update" >Actualizar</v-btn>
          <v-btn @click="resetParameters" >Reiniciar Parámetros</v-btn>
          <v-btn @click="resetCamera">Reset Camera</v-btn>
          <v-btn @click="toogleEditor">Ocultar</v-btn>
          <v-btn @click="openCommit">Commit</v-btn>
          <div oncontextmenu="return false;" id="viewerContext"></div>
        </v-flex>
        <v-flex xs12>
            <div id="parameterContext"></div>
        </v-flex>
    </v-flex>

    <v-flex xs4 v-bind:class="{ editorOculto: editor_oculto  }">
          <div id="editFrame">
            <div id="editor"></div>
          </div>
    </v-flex>
      </v-layout>
      
      <v-dialog
      v-model="commitDialog"
      persistent
      max-width="800"
    >
      <v-card>
        <v-card-title class="headline">Commit del proyecto</v-card-title>

        <v-card-text>
          <div><img :src="screenshot"/></div>
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
export default {
  props: ["computedCode"],
  data () {
    return {
        instantUpdate: true,
        CAD_defaultFile: 'CoCADa.jscad', // Used in export. TODO: ¿why not work?
        CAD_code: "function getParameterDefinitions() {\n\treturn [\n\t\t{ name: 'x',  caption: 'Size X', type: 'slider', default: 5, min: 2, max: 50, step: 1 }, \n\t\t{ name: 'y',  caption: 'Size Y', type: 'int', default: 5, min: 2, max: 50, step: 1 }, \n\t\t{ name: 'z',  caption: 'Size Z', type: 'float', default: 5, min: 2, max: 50, step: 0.25} \n\t];\n}\n\nfunction main(params){ \n\treturn cube([params.x, params.y, params.z]);\n}\n",
        editor_oculto: false,
        screenshot: null,
        commitDialog: false
      }
  },
  mounted () {
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
    },
    computed: {
      computedCode1(){
        return this.computedCode();
      }
    },
  methods: {
    openCommit() {
      this.screenshot = this.gProcessor.captureScreenshot()
      this.commitDialog = true;
    },
    commitAction() {

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
      this.editor_oculto = !this.editor_oculto;
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
    height: 350px;/* var(window_height); */
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

  .editorOculto{
    display: none;
  }


</style>

