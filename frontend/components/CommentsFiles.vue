<template>
    <div>
    <div v-for="(file, index) in files" :key="file.name">
        <div class="text-xs-center">
            <v-chip v-if="!showFileInModal(file.type)" :close="files_editable" small>
                <a :href="getAPI_URL('/containers/' + file.container + '/download/' + file.name)" :title="file.name" class="file-chip">
                <span v-html= "truncateText(file.name)" />
                </a> 
            </v-chip>
            <FileViewer v-else :files_editable="files_editable" :onClose="removeFile" :index="index" :mime="file.type" :title="file.name" :alt="file.name" :url="getAPI_URL('/containers/' + file.container + '/download/' + file.name)" :name="file.name"/>
        </div>
    </div>
    </div>
</template>
<script>
import config from '../nuxt.config'
import FileViewer from "@/components/FileViewer"

export default {
  components: {
    FileViewer
  },
  props: {
      "files": Array,
      "updateFile": Function,
      "files_editable": Boolean,
  },
  data () {
  return {
      files_list: []
    }
  },
  created() {
      //console.log(this.files_list);
      //console.log(this.files_editable)

  },
  methods: {
        getAPI_URL: function (url){
            return config.axios.browserBaseURL + url;
        },
		truncateText: function(filename) {
			return filename.substring(0,4) + '...' + filename.slice(-8)
		},
        showFileInModal: function (mime) {
            return (mime == 'image/jpeg' || mime == 'image/png' || mime == 'image/gif' || mime == 'image/bmp')
        },
        removeFile: function(index) {
            //this.files_list.splice(index, 1);
            this.updateFile(index);
        }
	}
}
</script>