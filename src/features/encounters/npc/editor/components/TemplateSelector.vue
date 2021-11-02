<template>
  <v-dialog>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
        Set Templates
      </v-btn>
    </template>
    <v-card>
      {{ availableTemplates }}
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CompendiumStore } from '@/store'

export default Vue.extend({
  name: 'npc-template-selector',
  computed: {
    availableTemplates() {
      return getModule(CompendiumStore, this.$store).NpcTemplates
    },
  },
})
</script>
