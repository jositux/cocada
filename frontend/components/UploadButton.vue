<template>
  <div>
    <!--div>{{ title }}</div>
    <div>
      <v-icon large color="blue darken-2">backup</v-icon>
    </div>
    <ul v-if="uploadfiles">
      <li v-if="file.name" v-for="(file, key) in uploadfiles" v-bind:key="file.id">
        <img v-if="thumb" width="50px" height="50px" v-bind:src="createURL(key)">Thumb</img>
        {{ file.name }}
        <a v-if="file.upload_status == 'not upload'" v-on:click="fileUpload(key)">Subir</a>
        <a v-if="file.upload_status == 'upload complete'" v-on:click="fileDelete(key)">Eliminar</a>
        <a v-if="file.upload_status == 'upload fail'" v-on:click="fileUpload(key)">Reintentar</a>
        <a v-if="file.upload_status == 'upload fail'" v-on:click="fileDelete(key)">Eliminar</a>
      </li>
    </ul>
    <div class="btn jbtn-file"> Examinar
      <div class="jbtn-file-list">
      </div>
      <form enctype="multipart/form-data">
        <input v-if="multiple" type="file" v-on:change="fileSelected" v-bind:accept="accept" multiple>
        <input v-else type="file" v-on:change="fileSelected" v-bind:accept="accept">
      </form>
    </div-->
  </div>
</template>

<script>
  export default {
    //name: 'upload-button',
    data() {
      return {
        uploadfiles: [],
        is_multiple: this.multiple,
      }
    },
    props: {
      selectedCallback: Function,
      title: String,
      multiple: false,
      chips: false,
      accept: String,
      thumb: false,
      upload_container: String
    },
    methods: {
      createURL(index) {
        let file = this.uploadfiles[index];
        let url = URL.createObjectURL(file);
        return url;
      },
      fileDelete(index) {
        var del = this.uploadfiles[index];
        if (del.upload_status == 'upload complete') {
          var container = del.upload_response.container;
          var filename = del.upload_response.filename;
          console.log("del " + index + " " + container + " " + filename);
          this.$axios({
            method: "DELETE",
            url: "/containers/" + container + "/files/" + filename,
          }).then(
            result => {
              this.uploadfiles.splice(index, 1);
              this.$forceUpdate();
              this.selectedCallback(this.uploadfiles);
            }
          )
        } else {
          this.uploadfiles.splice(index, 1);
          this.$forceUpdate();
          this.selectedCallback(this.uploadfiles);
        }
      },
      fileSelected(e) {
        for (var key = 0; key < e.target.files.length; key++) {
          if (e.target.files[key]) {
            e.target.files[key].upload_status = 'not upload';
            console.log(this.is_multiple)
            if (this.is_multiple) {
              this.uploadfiles.push(e.target.files[key]);
            } else {
              this.uploadfiles[0] = e.target.files[key];
            }
          }
          this.fileUploadAll()
        }
      },
      fileUpdateStatus(key, status, response) {
        this.uploadfiles[key].upload_status = status;
        this.uploadfiles[key].upload_response = response;
        this.$forceUpdate();
      },
      fileUpload(key) {
        console.log('uploading...')
        this.uploadfiles[key].upload_status = 'upload in progress'
        let formData = new FormData();
        let timestamp = new Date().getTime();
        formData.append('file', this.uploadfiles[key], timestamp + '-' + this.uploadfiles[key].name)
        //const ckey = key;
        this.$axios({
          method: "POST",
          url: "/containers/" + this.upload_container + "/upload",
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(
          result => {
            //let key = ckey;
            let response = new Object;
            response.filename = result.data.result.files.file[0].name
            response.container = result.data.result.files.file[0].container
            response.url = '/containers/' + result.data.result.files.file[0].container + '/download/' + result.data.result.files.file[0].name
            this.fileUpdateStatus(key, 'upload complete', response);
            this.selectedCallback(this.uploadfiles);
          },
          error => {
            console.error('error: ' + error)
            //var key = ckey;
            let response = new Object;
            this.fileUpdateStatus(key, 'upload fail', response);
          }
        )
      },
      fileUploadAll() {
        for (var key = 0; key < this.uploadfiles.length; key++) {
          if (this.uploadfiles[key].upload_status == 'not upload') {
            this.fileUpload(key);
          }
        }
      }
    }
  }
</script>

<style scoped>
  .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }
</style>
