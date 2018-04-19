<template>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs9>
          <div>
            <Viewer/>
          </div>
        </v-flex>
        <v-flex d-flex xs3>
            <div>
               <v-tabs icons-and-text centered light>
                  <v-tabs-slider color="yellow"></v-tabs-slider>
                  <v-tab href="#tab-1">
                    <v-icon small>history</v-icon>
                  </v-tab>
                  <v-tab href="#tab-2">
                    <v-icon small>history</v-icon>
                  </v-tab>
                  <v-tab href="#tab-3">
                    <v-icon small>history</v-icon>
                  </v-tab>
                  <v-tab-item id="tab-1">
                    <v-card flat>
                      <ChatList/>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item id="tab-2">
                    <v-card flat>
                      <HistoryList/>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item id="tab-3">
                    <v-card flat>
                      <FileList/>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
            </div>
        </v-flex>
      </v-layout>
    </v-container>
</template>


<script>
import ChatList from "@/components/ChatList"
import HistoryList from "@/components/HistoryList"
import FileList from "@/components/FileList"
import Viewer from "@/components/Viewer"

export default {
  props: ["image", "title", "description", "id"],
  components: {
    ChatList,
    HistoryList,
    FileList,
    Viewer
  }
}
</script>

<style scoped>
  .tabs__div {
    min-width: 33%;
  }
</style>
