<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap>
    <v-flex xs8>
        <v-flex xs12>
          <div oncontextmenu="return false;" id="viewerContext"></div>
        </v-flex>
        <v-flex xs12>
              
              <!--div id="tail">
                  <div id="statusdiv"></div>
              </div>
              <div id="errordiv"></div>
              <div id="parametersdiv"></div>
              <div id="selectdiv"></div-->
        </v-flex>
    </v-flex>

    <v-flex xs4>
      <v-btn @click="updateCode()" >Actualizar</v-btn>
      <v-btn @click="resetParameters()" >Reiniciar Parámetros</v-btn>
        <div id="editFrame">
          <div id="editor"></div>
        </div>
    </v-flex>
      </v-layout>
</v-container>
  
</template>

<script>
export default {
  props: [],
  mounted () {
    // Load openscad
    const Processor = require("~/commons/cocada_openjscad.js")
    const Editor = require("@jscad/openjscad/src/ui/editor")  

    // Set processor
    this.gProcessor = new Processor(document.getElementById('viewerContext'))
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
  data () {
    return {
        instantUpdate: true,
        CAD_defaultFile: 'CoCADa.jscad', // Used in export. TODO: ¿why not work?
        CAD_code: "function main (p) { return cube({size: [10,10,p.size]}); } function getParameterDefinitions() { return [ { name: 'size', caption: 'Size', type: 'int', default: 16} ]; }",
      }
  },
  methods: {
    updateInstant() {
      // Mantiene actualizado el estado del checkbox instant update en openscad y nuxt.
      this.instantUpdate = document.getElementById('instantUpdate').checked;
    },
    updateCode() {
      console.log('updateCode')
      // Manitiene actualizado el código entre openscad y nuxt
      this.CAD_code = this.gEditor.getValue();
      if (this.instantUpdate === true) {
        console.log('update')
        this.gProcessor.setJsCad(this.gEditor.getValue(), this.CAD_defaultFile)
      }
    },
    resetParameters(){
      // Reset user input values
      this.gProcessor.paramControls = []
      this.gProcessor.setJsCad(this.gEditor.getValue(), this.CAD_defaultFile)
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

  #editHandle {
  }

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


</style>

