<template>
  <div id="3D">
      <v-btn color="info" v-on:click="test()">Test</v-btn>
      <div id="viewer"> </div>
      
        <v-text-field
          label="OpenJSCad code"
          textarea
          rows="15"
          auto-grow
          :value="OpenJsCad_code()"
        ></v-text-field>
      
  </div>        
</template>


<script>
export default {
  props: [],
  /*head () {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
        { src: '/src/three.min.js' },
        { src: '/src/orbitcontrols.js' },
        { src: '/src/csg.js' },
        { src: '/src/threecsg.js' },
        { src: '/src/openjscad.js' },
        { src: '/src/formats.js' },
      ],*/
      /* __dangerouslyDisableSanitizers: ['script'], */
      /* link: [*/
//        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
      /* ] 
    } 
  }, moved to nuxt.config.js */
  created () {
  },
  mounted () {
      this.gProcessor = new OpenJsCad.Processor(document.getElementById("viewer"));
      OpenJsCad.AlertUserOfUncaughtExceptions();

      this.updateSolid();
  },
  data () {
    return {
        gProcessor: null,
        CAD_code: 'function main(params) { return CSG.cube({ size: params.size }) }',
        CAD_params: "function getParameterDefinitions() { return [ { name: 'size', caption: 'Size', type: 'int', default: 10} ]; }",
      }
  },
  methods: {
    OpenJsCad_code () {
      return this.CAD_code + this.CAD_params
    },
    updateSolid () {
        // Show all exceptions to the user:
        this.gProcessor.setJsCad(this.OpenJsCad_code());
        this.gProcessor.rebuildSolid()
    },
    test () {

        console.log(JSON.stringify(this.gProcessor.getParamValues()))
        console.log(JSON.stringify(OpenJsCad.getParamDefinitions(this.OpenJsCad_code())))
        //.getParamDefinitions());
        // getParamValues
    }
  }
  
}

function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }
</script>