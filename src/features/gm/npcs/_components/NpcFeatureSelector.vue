<template>
  <div>npc feature selector</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'npc-feature-selector',
  props: {
    item: { type: Object, required: true },
  },
})
</script>
