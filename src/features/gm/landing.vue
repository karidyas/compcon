<template>
  <v-container fluid style="overflow: hidden; height: calc(100vh - 50px)">
    <v-row style="height: 80%; padding-top: 7%" class="mt-1" align="center">
      <v-col cols="12">
        <v-row align="center" justify="center" dense>
          <landing-card
            cols="8"
            to="gm/campaigns"
            name="Campaigns"
            description="Create and run LANCER campaigns"
            :ratio="7"
            img="jungle.jpg"
            dark
          />
          <v-col cols="8">
            <v-btn block small outlined color="secondary" disabled>Continue Campaign</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center" justify="center" dense>
          <landing-card
            cols="3"
            to="gm/npcs"
            name="NPC Roster"
            :ratio="1"
            description="Create and manage non-player characters for combat encounters"
            img="npc.jpg"
          />
          <landing-card
            cols="8"
            to="gm/encounters"
            name="Encounters"
            :ratio="5"
            description="Create and run combat encounters"
            img="combat.jpg"
          />
          <v-col cols="8" offset="3">
            <v-btn block small outlined color="secondary" disabled>Continue Encounter</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import LandingCard from './_components/LandingCard.vue'

export default Vue.extend({
  name: 'home',
  components: { LandingCard },
})
</script>
