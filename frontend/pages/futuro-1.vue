<template>
<v-container grid-list-md text-xs-center>
  <v-layout row wrap>
    <v-flex xs12>
        
         
          <div oncontextmenu="return false;" id="viewerContext">
              <div class="sketchfab-embed-wrapper">
    <div class="sketchfab-embed-wrapper">
    <iframe title="A 3D model" width="960" height="640" src="https://sketchfab.com/models/ceb4b8ba11b349b18c039713bccfe9a0/embed" frameborder="0" allow="autoplay; fullscreen; vr" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>


</div>


</div>
          </div>
        
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
  props: {}
}
</script>
