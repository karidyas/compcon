<template>
  <equipment-card-base :item="item" :dense="dense">
    <v-col v-if="!dense" cols="auto" class="ml-auto text-right">
      <div class="heading h2">{{ item.FeatureType }}</div>
      <span class="flavor-text subtle--text" style="text-transform: capitalize;">
        //{{ item.Origin.Name }} ({{ item.Origin.Type }}),
        {{ item.Origin.Optional ? 'Optional' : 'Base' }} System
      </span>
      <div v-if="item.InLcp" class="flavor-text subtle--text">{{ item.LcpName }}</div>
    </v-col>
  </equipment-card-base>
</template>

<script lang="ts">
import Vue from 'vue'
import EquipmentCardBase from './_EquipmentCardBase.vue'

export default Vue.extend({
  name: 'cc-npc-system-card',
  components: { EquipmentCardBase },
  props: {
    item: {
      type: Object,
      required: true,
    },
    dense: { type: Boolean },
  },
})
</script>
