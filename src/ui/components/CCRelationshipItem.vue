<template>
  <v-card flat>
    <v-card-text :outlined="print" class="pa-1">
      <div v-if="print">
        <div class="heading h4">{{ relationship.name }}</div>
        <div>{{ relationship.relationship }}</div>
      </div>
      <div v-else>
        <v-row no-gutters align="center">
          <v-col cols="auto" class="mr-2">
            <slot />
          </v-col>
          <v-col>
            <v-combobox
              :value="relationship.name"
              hide-details
              outlined
              dense
              :items="items"
              item-text="Name"
              item-value="Name"
              :placeholder="itemType"
              @change="setName($event)"
            />
          </v-col>
          <v-col cols="auto" class="ml-2">
            <v-btn small icon color="error" class="fadeSelect" @click="$emit('delete')">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-textarea
          v-model="relationship.relationship"
          rows="2"
          auto-grow
          filled
          dense
          hide-details
          label="Detail"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'cc-relationship-item',
  props: {
    relationship: { type: Object, required: true },
    itemType: { type: String, required: true },
    items: { type: Array, required: false, default: () => [] },
    print: { type: Boolean },
  },
  methods: {
    setName(n) {
      console.log(n)
      if (typeof n === 'string') this.relationship.name = n
      else this.relationship.name = n.Name || 'ERR'
    },
  },
})
</script>
