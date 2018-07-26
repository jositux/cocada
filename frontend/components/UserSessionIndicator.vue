<template>
    <div class="text-xs-center" v-if="this.$auth.$state.loggedIn">
    <v-menu offset-y>
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
        {{ SesionName() }}
      </v-btn>
      <v-list>
        <v-list-tile 
          router
          v-for="(item, index) in items"
          :key="index"
          :to="item.to"
        >
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      title: '',
      items: [
        { title: 'Editar Perfil', to: '/user/perfil' },
        { title: 'Cerrar Sesión', to: '/user/logout' },
      ]
    }),
    methods: {
        SesionName(){
            return 'Hola, ' + this.$auth.$state.user.username
        }
    }
    
  }
</script>

