<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
            <h2>Nuevo Proyecto</h2>
            <v-text-field label="Nombre" v-model="project.title" required :error-messages="this.errors.title"></v-text-field>
            <v-text-field label="Descripción" v-model="project.description" required textarea :error-messages="this.errors.description"></v-text-field>
            <!-- <upload-button title="Subir archivo JSCAD" :selectedCallback="fileSelectedFunc" accept="images/*" multiple=true chips=true thumb=true> -->
            <upload-button title="Subir Imágen" :selectedCallback="fileSelectedFunc" accept="images/*" thumb=true>
            </upload-button>
            </div>
            <div class="actions">
                <v-btn v-on:click="saveProject">Guardar</v-btn>
            </div>
        </v-card-text>
    </v-layout>
</template>

<script>
    import UploadButton from '@/components//UploadButton';
    export default {
        components: {
            UploadButton
        },
        data() {
            return {
                project: {
                    "authorId": 0,
                    "thumbnail": "",
                    "title": "",
                    "description": "",
                    "token": "",
                    "created": "",
                    "status": "",
                },
                errors: {
                    title: [],
                    description: [],
                }
            }
        },
        methods: {
            fileSelectedFunc(upload) {
                this.project.thumbnail = ''
                this.project.thumbnail = upload[0].upload_response.url
            },
            validateForm(){
              this.errors.title = []
              if (this.project.title.length == 0) {
                this.errors.title.push('El Nombre del Proyecto es obligatorio.')
              }

              this.errors.description = []
              if (this.project.description.length == 0) {
                this.errors.description.push('La Descripción del Proyecto es obligatoria.')
              }
              this.$forceUpdate();  
            },
            saveProject(){
                this.validateForm();
                this.project.authorId = this.$auth.$state.user.id;
                this.project.created = new Date().toISOString();
                this.project.status = 'Active'

                console.log(JSON.stringify(this.project))

                this.$axios.post('/Projects', this.project)
                .then( result => {
                    console.log('save ok')
                    this.$router.push('/')
                    },
                    error => {
                        console.log('save fail')
                    }
                )
            }
        }
    }
</script>
