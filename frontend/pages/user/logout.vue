<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
             <b-btn class="ml-3" variant="danger" @click="$auth.logout()">Logout</b-btn>
        </v-card-text>
    </v-layout>
</template>