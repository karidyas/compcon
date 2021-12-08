<template>
  <div>npc feature alerts</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'npc-feature-alerts',
  props: {
    item: { type: Object, required: true },
  },
})
</script>
