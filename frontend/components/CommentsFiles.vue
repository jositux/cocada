<template>
    <div>
    <div v-for="file in files" :key="file.id">
        <div class="text-xs-center">
            <v-chip close small>
            <a :href="file.url" :title="file.text" class="file-chip">
                <span v-html= "truncateText(file.text)" />
            </a> 
            </v-chip>
        </div>
    </div>
    </div>
</template>
<script>
export default {
  props: {
      id: String,
  },
  created () {
      console.log(this.id)
  },
  data () {
  return {
      files: [
          { url: 'url1.com', text: 'archivo1.jpg' }, 
          { url: 'url2.com', text: 'archivo2.jpg' },
        ]
    }
  },
  
  methods: {
		truncateText: function(filename) {
			return filename.substring(0,4) + '...' + filename.slice(-8)
		}
	} 
}
</script>