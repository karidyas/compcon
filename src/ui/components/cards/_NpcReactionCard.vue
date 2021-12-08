<template>
  <equipment-card-base :item="item" :dense="dense">
    <v-col v-if="!dense" cols="auto" class="ml-auto text-right">
      <span class="flavor-text subtle--text" style="text-transform: capitalize;">
        //{{ item.Origin.Name }} ({{ item.Origin.Type }}),
        {{ item.Origin.Optional ? 'Optional' : 'Base' }} Reaction
      </span>
    </v-col>
    <div slot="statblock">
      <span class="overline ml-n2">TRIGGER</span>
      <p
        class="text--text"
        style="font-size: 20px"
        v-html-safe="`<b>Trigger:&nbsp;</b>${item.Trigger}`"
      />
    </div>
  </equipment-card-base>
</template>

<script lang="ts">
import Vue from 'vue'
import EquipmentCardBase from './_EquipmentCardBase.vue'

export default Vue.extend({
  name: 'cc-npc-weapon-card',
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
