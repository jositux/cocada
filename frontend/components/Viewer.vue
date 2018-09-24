<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap>
    <v-flex xs8>
        <v-flex xs12>
           <div oncontextmenu="return false;" id="viewerContext"></div>
        </v-flex>
        <v-flex xs12>
              <div id="tail">
                  <div id="statusdiv"></div>
              </div>
              <div id="errordiv"></div>
              <div id="parametersdiv"></div>
              <div id="selectdiv"></div>
        </v-flex>
    </v-flex>

    <v-flex xs4>
      <div id="editFrame">
        <div id="editor"></div>
      </div>
    </v-flex>
      </v-layout>
</v-container>
  
</template>

<script>

//const Processor = require("@jscad/openjscad/dist/index.js")
//const Editor = require("@jscad/openjscad/dist/index.js")
export default {
  props: [],
  mounted () {
    const Processor = require("~/commons/cocada_openjscad.js")
    const Editor = require("@jscad/openjscad/src/ui/editor")  

    var gProcessor = new Processor(document.getElementById('viewerContext'))
    gProcessor.createElements()

    var gEditor = Editor.setUpEditor('editor', gProcessor)
    
    Editor.putSourceInEditor(gEditor, this.CAD_code, 'CoCADa.jscad')
    gProcessor.setJsCad(this.CAD_code, 'CoCADa.jscad')

    //  gProcessor.updateFormatsDropdown()
      //gProcessor.createElements()


      //gProcessor.setJsCad(document.getElementById('editor'))      
     // gProcessor.rebuildSolid()
  
      //this.gProcessor.setJsCad(this.OpenJsCad_code());
      //console.log(JSON.stringify(gProcessor.script))
      //console.log(JSON.stringify(gProcessor.paramDefinitions))
      
      //  putSourceInEditor(gEditor, content, 'MyDesign.jscad')
      //  gProcessor.setJsCad(content, 'MyDesign.jscad')

      /*console.log(window.innerWidth)
      console.log(window.innerHeight)
      console.log(this.cssProps())*/

    },
  data () {
    return {
        CAD_code: "function main (p) { return cube({size: [10,10,p.size]}); } function getParameterDefinitions() { return [ { name: 'size', caption: 'Size', type: 'int', default: 16} ]; }",
        //CAD_params: "function getParameterDefinitions() { return [ { name: 'size', caption: 'Size', type: 'int', default: 16} ]; }",
      }
  },
  methods: {
    /*OpenJsCad_code () {
      return this.CAD_code + this.CAD_params
    },*/
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

