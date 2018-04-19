<template>
  <v-layout>
    <v-flex text-xs-center>
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson SAAAA</em>
          </small>
          <h1>Upload a File</h1>
          <form enctype="multipart/form-data">
            <input type="file" name="file" @change="fileChange($event.target.files)" >
            <button type="button" @click="upload()">Upload</button>
          </form>
          <button type="button" @click="testlogin()">Test Login</button>
          <button type="button" @click="testlogout()">Test Logout </button>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      files: new FormData()
    }
  },
  methods: {
    fileChange(fileList) {
      this.files.append("file", fileList[0], fileList[0].name)
    },
    upload() {
      this.$axios({
        method: "POST",
        url: "http://192.168.1.101:3010/api/containers/test/upload",
        data: this.files
      }).then(
        result => {
          console.dir(result.data)
        },
        error => {
          console.error(error)
        }
      )
    },
    testlogin() {
      this.$auth.login({
        data: {
          username: "marcos",
          password: "tazmania"
        }
      })
      /* this.$axios(
        {
          method: 'POST',
          'url': 'http://localhost:3010/api/Users/login',
          data: {
            username: 'marcos',
            password: 'tazmania'
          }
        }).then(response => {
        console.log(response.data)
      })
        .catch(e => {
          this.errors.push(e)
        }) */

      var a = this.$axios({
        method: "GET",
        url: "http://localhost:3010/api/Users",
        params: { access_token: this.$auth.token }
      })
      console.log(a)
    },
    testlogout() {
      /* this.$axios(
        {
          method: 'POST',
          'url': 'http://localhost:3010/api/Users/logout',
          'params': { 'access_token': this.$auth.token }
        })
      this.$auth.setToken('') */
      console.log(this.$auth.state.user)
      console.log(this.$auth.token)
    }
  }
}
</script>
