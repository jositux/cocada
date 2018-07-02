<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
            <h2>Login</h2>
            <v-text-field 
                id="username" 
                v-model="username" 
                label="Usuario" 
            ></v-text-field>
            <v-text-field 
                id="password" 
                v-model="password" 
                label="Contraseña"
                type="password" 
            ></v-text-field>
             <b-btn class="ml-3" variant="danger" @click="$auth.logout()">Logout</b-btn>
            <div class="actions">
                <v-btn v-on:click="alogin">Login</v-btn>
            </div>
        </v-card-text>
    </v-layout>
</template>

<script>
export default {
    data(){
        return {
            username:'',
            password:'',
        }
    },
    methods: {
        async alogin() {
            this.error = null
            return this.$auth
            .login({ data: {
                username: this.username,
                password: this.password,
                }})
            .catch(e => {
            this.error = e + ''
            console.log(e);
            })
        },
    }
}
</script>
