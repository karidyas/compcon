<template>
  <span>
    <cc-tooltip
      title="Power Rating"
      content="The Power Rating is an attempt to calculate the relative strength of an NPC based on tier, applied templates, and feature selections compared to mission’s Pilot and their current level. It should, generally, produce results more or less in line with the Balancing Combat section on pp. 283 of the LANCER Core Book.<br> That said, this is an experimental feature that is still very heavily in development, and does not always produce reliable results. Moreover, this tool doesn’t consider NPC or player team composition, synergies, strengths, and weaknesses. Nor does this tool consider map layout, mission objectives, or reinforcement schedules.<br>While we will continue to work on this tool to produce more accurate, actionable results, please use it only as a general indicator of relative NPC strength."
    >
      <i class="flavor-text">
        Calculated Power Rating: {{ item.Power.toString().padStart(4, '0') }}
        <v-icon small right>mdi-information-outline</v-icon>
      </i>
    </cc-tooltip>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'power-rating-tooltip',
  props: { item: { type: Object, required: true } },
})
</script>
