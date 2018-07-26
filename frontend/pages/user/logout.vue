<template>
    <v-layout row wrap>
        <v-card-text style="height: 100px; position: relative">
             <v-btn class="ml-3" variant="danger" @click="$auth.logout()">Logout</v-btn>
        </v-card-text>
    </v-layout>
</template>