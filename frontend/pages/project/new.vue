<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
            <h2>Nuevo Proyecto</h2>
            <v-alert v-if="error"
            :value="true"
            color="error"
            >
            {{this.error}}
            </v-alert>
            <v-alert v-if="success"
            :value="true"
            color="success"
            >
            {{this.success}}
            </v-alert>
            <v-text-field label="Nombre" v-model="project.title" required :error-messages="this.errors.title"></v-text-field>
            <v-text-field label="Descripción" v-model="project.description" required textarea :error-messages="this.errors.description"></v-text-field>
            
            <div class="actions">
                <v-btn color="success" v-on:click="saveAction">Guardar</v-btn>
                <v-btn v-on:click="cancelAction">Cancelar</v-btn>
            </div>
        </v-card-text>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                project: {
                    "authorId": this.$auth.$state.user.id,
                    "title": "",
                    "description": ""
                },
                errors: {
                    title: [],
                    description: [],
                },
                error: '',
                success: '',

            }
        },
        methods: {
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
            saveAction(){
                this.validateForm();
                console.log(this.project);
                this.$axios.post('/projects', this.project)
                .then( result => {
                    this.success = 'Proyecto Creado'
                    this.$router.push('/project/' + result.data.id)
                    },
                    error => {
                        console.log(error)
                        console.log('save fail')
                    }
                )
            },
            cancelAction(){
                this.$router.push('/')
            }
        }
    }
</script>
