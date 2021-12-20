<template>
  <v-hover v-slot="{ hover }" style="cursor: pointer">
    <v-card
      :elevation="hover ? 12 : 0"
      :outlined="!hover"
      height="100%"
      @click="$emit('open', item.ID)"
    >
      <v-img :aspect-ratio="1" :src="item.Image">
        <v-fade-transition>
          <div
            v-if="hover"
            class="d-flex text-center primary darken-2 v-card--reveal heading h2 white--text"
            style="height: 100%"
          >
            stats
            <br />
            features
            <br />
            notes
          </div>
        </v-fade-transition>
      </v-img>
      <div style="position:absolute; top: 0;">
        <v-chip
          small
          label
          :color="hover ? 'accent' : 'primary'"
          class="ma-1"
          v-for="(t, i) in item.Templates"
          :key="`${item.ID}_template_${i}`"
        >
          <v-icon small>cci-npc-template</v-icon>
          {{ t.Name }}
        </v-chip>
      </div>
      <v-card-text class="pa-0 pb-2 text-center" style="position: relative">
        <div class="text-button" :class="hover ? 'accent--text' : ''">
          {{ `T${item.Tier}` }}
          <span v-if="item.Class">{{ item.Class.Name }}</span>
          <span v-if="item.Tag">{{ item.Tag }}</span>
        </div>
        <div class="heading h2" :class="hover ? 'accent--text' : ''">{{ item.Name }}</div>

        <!-- <v-divider /> -->
        <!-- <v-chip
          small
          :color="hover ? 'accent' : ''"
          v-for="(l, i) in item.Labels"
          :key="`${item.ID}_label_${i}`"
          v-text="l"
        /> -->
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'gm-item-card',
  props: {
    item: { type: Object, required: true },
  },
})
</script>
