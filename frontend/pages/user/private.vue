<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
            <h2>Private</h2>
            {{ $auth.$state }}
        </v-card-text>
    </v-layout>
</template>

<script>
export default {
}
</script>