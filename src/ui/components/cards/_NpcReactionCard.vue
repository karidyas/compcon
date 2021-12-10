<template>
  <equipment-card-base :item="item" :dense="dense">
    <v-col v-if="!dense" cols="auto" class="ml-auto text-right">
      <span class="flavor-text subtle--text" style="text-transform: capitalize;">
        //{{ item.Origin.Name }} ({{ item.Origin.Type }}),
        {{ item.Origin.Optional ? 'Optional' : 'Base' }} Reaction
      </span>
    </v-col>
    <div slot="statblock" class="mt-2 mb-n2">
      <div class="overline ml-n2 mb-n2">TRIGGER</div>
      <p class="text--text body-1 font-weight-bold" v-html-safe="`${item.Trigger}`" />
    </div>
  </equipment-card-base>
</template>

<script lang="ts">
import Vue from 'vue'
import EquipmentCardBase from './_EquipmentCardBase.vue'

export default Vue.extend({
  name: 'cc-npc-reaction-card',
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
