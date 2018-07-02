<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
            <h2>Nuevo Proyecto</h2>
            <v-text-field 
                id="nombre" 
                name="nombre" 
                label="Nombre" 
            ></v-text-field>
            <v-text-field
                id="descripcion"
                name="descripcion"
                label="Descripción"
                textarea
            ></v-text-field>

            <div><v-icon large color="blue darken-2">backup</v-icon></div>
            <div>
                <upload-button title="Examinar" :selectedCallback="fileSelectedFunc">
            </upload-button></div>

            <div class="actions">
                <v-btn>Guardar</v-btn>
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
      project: [],
      errors: []
    }
  },
}
</script>
