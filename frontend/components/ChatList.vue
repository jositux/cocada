<template>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-subheader v-if="item.header" :key="item.header"><!--{{ item.header }}--></v-subheader>
              <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
              <v-list-tile avatar v-else :key="item.title">
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <!--<h3 v-html="item.title">
                  </h3>-->
                  <p v-html="item.subtitle" class="caption">
                  </p>

                  <span v-html="getFecha(item.date)" class="caption">
                  </span>
 
                 <div v-for="file in item.files" :key="file.id">
                  <div class="text-xs-center">
                    <v-chip close small>
                    <a :href="file.url" :title="file.text" class="file-chip">
                      <span v-html= "truncateText(file.text)" />
                    </a> 
                    </v-chip>
                  </div>
                 </div>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
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
		truncateText: function(filename) {
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
  .list__tile__content {
    justify-content: initial;
  }

  .list--two-line .list__tile,
  .list__tile--avatar {
    height: auto;
  }
</style>
