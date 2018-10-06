<template>
    <div class="text-xs-center" v-if="this.$auth.$state.loggedIn">
    <v-menu offset-y>
      <v-btn
        slot="activator"
        color="primary"
        dark
        data-cy="session-menu"
      >
        {{ SesionName() }}
      </v-btn>
      <v-list>
        <v-list-tile 
          router
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
           @click="logoutDialog = true"
        ><v-list-tile-title :click="item.click" v-text="item.title" :data-cy="item.datacy"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-dialog
      v-model="logoutDialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">¿Desea cerrar sesión en CoCADa?</v-card-title>
        <v-card-text>
          Si cierra sesión cualquier progreso que no se haya guardado se perderá. 
        </v-card-text>
        <v-card-text>
          ¿Está seguro?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            @click="dialog = false"
          >
            Permanecer
          </v-btn>

          <v-btn
            data-cy="dialog-logout"
            color="primary"
            @click="logoutAction"
          >
            Cerrar Sesión
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Editar Perfil', to: '/user/perfil', "datacy": 'profile' },
        { title: 'Cerrar Sesión', to: '#', click: "logoutDialog = true", "datacy": 'logout' },
      ],
      logoutDialog: false
    }),
    methods: {
        SesionName(){
            return 'Hola, ' + this.$auth.$state.user.username
        },
        logoutAction(){
          this.$auth.logout()
          this.$auth.reset()

          this.logoutDialog=false;

          this.$router.push("user/login");
          this.$forceUpdate();
        }
        
    }
    
  }
</script>

