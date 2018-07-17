<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
            <h2>Login</h2>
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
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field 
                    id="username" 
                    v-model="username" 
                    label="Usuario" 
                    :rules="usernameRules"
                ></v-text-field>
                <v-text-field 
                    id="password" 
                    v-model="password" 
                    label="Contraseña"
                    type="password" 
                    :rules="passwordRules"
                ></v-text-field>
             
                <div class="actions">
                    <v-btn type="submit" v-on:click="login">Login</v-btn>
                </div>
            </v-form>
        </v-card-text>
    </v-layout>
</template>

<script>
export default {
    data(){
        return {
            username:'',
            usernameRules: [
                v => !!v || 'El nombre de Usuario es obligatorio.',
                v => (v && v.length <= 20) || 'El nombre de usuario debe ser menor a 20 caracteres.'
            ],
            password:'',
            passwordRules: [
                v => !!v || 'La Contraseña es obligatoria.',
                v => (v && v.length <= 20) || 'El nombre de usuario debe ser menor a 20 caracteres.'
            ],
            valid: true,
            error: '',
            success: '',
        }
    },
    methods: {
        async login(e) {
            e.preventDefault()
            if (this.$refs.form.validate()) {
                this.error = ''
                return this.$auth
                .login({ data: {
                    username: this.username,
                    password: this.password,
                    }})
                .then(result => {
                        this.success = 'Acceso Correcto'
                        this.$router.push('/')
                    },
                    error => {
                        //console.dir(JSON.stringify(error.response.data.error.message))
                        this.error = error.response.data.error.message
                        this.error = this.error.charAt(0).toUpperCase() + this.error.substr(1);
                    }
                )
                .catch(e => {
                    this.error = e.str
                    console.log('test: ' + e);
                })
            }
        },
    }
}
</script>
