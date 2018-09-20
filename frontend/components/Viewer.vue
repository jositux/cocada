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
    const Processor = require("@jscad/openjscad/src/jscad/processor.js")
    const Editor = require("@jscad/openjscad/src/ui/editor")  

    var Options = {
      viewer: {
        camera: {
          fov: 45, // field of view
          angle: { x: -60, y: 0, z: -45 }, // view angle about XYZ axis
          position: { x: 0, y: 0, z: 100 }, // initial position at XYZ
          clip: { min: 0.5, max: 1000 // rendering outside this range is clipped
          } },
        plate: {
          draw: true, // draw or not
          size: 200, // plate size (X and Y)
          // minor grid settings
          m: {
            i: 10, // number of units between minor grid lines
            color: { r: 0.8, g: 0.8, b: 0.8, a: 0.5 // color
            } },
          // major grid settings
          M: {
            i: 100, // number of units between major grid lines
            color: { r: 0.5, g: 0.5, b: 0.5, a: 0.5 // color
            } }
        },
        axis: {
          draw: true, // draw or not
          x: {
            neg: { r: 1.0, g: 0.5, b: 0.5, a: 0.8 }, // color in negative direction
            pos: { r: 1.0, g: 0, b: 0, a: 1 // color in positive direction
            } },
          y: {
            neg: { r: 0.5, g: 1.0, b: 0.5, a: 0.8 }, // color in negative direction
            pos: { r: 0, g: 1.0, b: 0, a: 1 // color in positive direction
            } },
          z: {
            neg: { r: 0.5, g: 0.5, b: 1.0, a: 0.8 }, // color in negative direction
            pos: { r: 0, g: 0, b: 1.0, a: 1 // color in positive direction
            } }
        },
        solid: {
          faceColor: { r: 0.0, g: 0.4, b: 1.0, a: 1.0 }, // default face color
          outlineColor: { r: 0.0, g: 0.0, b: 0.0, a: 0.1} // default outline color
        },
        background: {
          color: { r: 0.93, g: 0.93, b: 0.93, a: 1.0 }
        }
      }
    }
    var gProcessor = new Processor(document.getElementById('viewerContext'), Options)
    var gEditor = Editor.setUpEditor('editor', gProcessor)
    
    Editor.putSourceInEditor(gEditor, this.OpenJsCad_code(), 'CoCADa.jscad')
    gProcessor.setJsCad(this.OpenJsCad_code(), 'CoCADa.jscad')

    //  gProcessor.updateFormatsDropdown()
      //gProcessor.createElements()


      //gProcessor.setJsCad(document.getElementById('editor'))      
     // gProcessor.rebuildSolid()
  
      //this.gProcessor.setJsCad(this.OpenJsCad_code());
      //console.log(JSON.stringify(gProcessor.script))
      //console.log(JSON.stringify(gProcessor.paramDefinitions))
      
      //  putSourceInEditor(gEditor, content, 'MyDesign.jscad')
      //  gProcessor.setJsCad(content, 'MyDesign.jscad')

      console.log(window.innerWidth)
      console.log(window.innerHeight)
      console.log(this.cssProps())

    },
  data () {
    return {
        CAD_code: "function main (p) { return cube({size: [10,10,p.size]}); }",
        CAD_params: "function getParameterDefinitions() { return [ { name: 'size', caption: 'Size', type: 'int', default: 16} ]; }",
      }
  },
  methods: {
    OpenJsCad_code () {
      return this.CAD_code + this.CAD_params
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

