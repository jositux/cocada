<template>
  
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div class="headline">Unlimited music now</div>
                <div>Listen to your favorite artists and albums whenever and wherever, online and offline.</div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card color="cyan darken-2" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Supermodel</div>
                      <div>Foster the People</div>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media
                      src="/static/doc-images/cards/foster.jpg"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card color="purple" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Halycon Days</div>
                      <div>Ellie Goulding</div>
                    </div>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-media
                      src="/static/doc-images/cards/halcyon.png"
                      height="125px"
                      contain
                    ></v-card-media>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
</template>


<script>
export default {
  props: [],
  data () {
  return {
      items: [
        { header: 'Today' },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?", date: "March 4, 1995 01:24:00", 
        files: [ { url: 'url1.com', text: 'archivo1.jpg' }, { url: 'url2.com', text: 'archivo2.jpg' } ] },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.", date: "December 17, 1995 03:24:00",
        files: [ { url: 'url1.com', text: 'archivo3.jpg' }, { url: 'url2.com', text: 'archivo4.jpg' } ] },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?", date: "September 05, 1995 05:21:00",
        files: [ { url: 'url1.com', text: 'archivo5.jpg' }, { url: 'url2.com', text: 'archivo6.jpg' } ] }
      ]
    }
  },
  methods: {
		collapseText: function(filename) {
			return filename.substring(0,4) + '...' + filename.slice(-8)
		},
    getFecha: function(fecha) {
      var fechaR = new Date(fecha);
      return (fechaR.getDate() + "-" + (fechaR.getMonth()+1) + " " + fechaR.getHours() + ":" + fechaR.getMinutes());
    }
	} 
}


</script>

<style>

</style>
