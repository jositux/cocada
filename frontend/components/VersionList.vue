<template>
  
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex v-for="ver in versions" xs12>
            <v-card color="" class="black--text">
              <v-layout>
                <v-flex xs3 class="left-history">
                  
                  <img
                    :src="getAPI_URL(ver.image)"
                    class="thumbnail"
                  ></img>
                </v-flex>
                <v-flex xs8 class="right-history">
                  <v-card-title primary-title>
                    <div>
                      <nuxt-link :to="'/project/' + $route.params.id + '/' + ver.id">
                      <div class="headline">{{ ver.id }}</div>
                      </nuxt-link>
                      <div>{{ ver.description }}</div>
                      <div>{{ getFecha(ver.createdAt)}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-card>
              <!-- v-card-title primary-title>
                <div class="headline">{{ ver.id }}</div>
                <div>{{ ver.description }}</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Mostrar</v-btn>
              </v-card-actions>
            </v-card  -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
</template>


<script>
import config from '../nuxt.config'
export default {
  props: [],
  data () {
  return {
      versions: []
    }
  },
  created(){
    //this.$route.params.id
      this.$axios({
        method: 'get',
        url: '/Versions',
        params: {"filter":{"where":{"projectId":this.$route.params.id}}}
      })
      .then(response => {
        this.versions = response.data.reverse()
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
  methods: {
    getAPI_URL: function (url){
      return config.axios.browserBaseURL + url;
    },
    getFecha: function(fecha) {
      var fechaR = new Date(fecha);
      return (fechaR.getDate() + "-" + (fechaR.getMonth()+1) + "-" + (fechaR.getFullYear()) +  " " + fechaR.getHours() + ":" + fechaR.getMinutes());
    }
	} 
}


</script>

<style>
  .headline {
    font-size: 12px !important;
  }

  .left-history {
    overflow: hidden;
    margin-left: 15px;
  }

  .right-history .card__title--primary {
    padding: 0;
  }

  .thumbnail {
    width: 200px;
    margin-left: -50px;
    height: auto;
  }

</style>
