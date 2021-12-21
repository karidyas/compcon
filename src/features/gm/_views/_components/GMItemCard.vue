<template>
  <div>
    <component
      v-if="list"
      :is="listComponent"
      :item="item"
      :big="big"
      :list="list"
      :odd="odd"
      @open="$emit('open')"
    />
    <component
      v-else
      :is="cardComponent"
      :item="item"
      :big="big"
      :odd="odd"
      :list="list"
      @open="$emit('open')"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'gm-item-card',
  props: {
    item: { type: Object, required: true },
    big: { type: Boolean },
    list: { type: Boolean },
    odd: { type: Boolean },
  },
  computed: {
    cardComponent() {
      if (!this.item) {
        return null
      }
      return () => {
        try {
          return import(`./gmItemCards/GM${this.item.ItemType}Card.vue`)
        } catch (error) {
          console.error(`Unable to load component ${this.item.ItemType}`)
          return null
        }
      }
    },
    listComponent() {
      if (!this.item) {
        return null
      }
      return () => {
        try {
          return import(`./gmItemCards/GM${this.item.ItemType}ListItem.vue`)
        } catch (error) {
          console.error(`Unable to load component ${this.item.ItemType}`)
          return null
        }
      }
    },
  },
})
</script>
