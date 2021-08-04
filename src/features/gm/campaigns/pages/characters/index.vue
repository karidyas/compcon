<template>
  <div>
    <gm-collection-view
      title="Characters"
      item-type="Character"
      :items="item.Characters"
      @add-new="item.AddCharacter()"
      @open="openItem($event)"
    />
    <v-dialog v-model="dialog">
      <v-card flat>
        <editor v-if="character" :character="character" @close="saveAndClose()" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GmCollectionView from '../../../_views/GMCollectionView.vue'
import Editor from './editor.vue'

export default Vue.extend({
  name: 'characters-roster',
  components: { GmCollectionView, Editor },
  props: {
    item: { type: Object, required: true },
  },
  data: () => ({
    id: '',
    dialog: false,
  }),
  computed: {
    character() {
      if (!this.id) return null
      return this.item.Characters.find(x => x.ID === this.id)
    },
  },
  methods: {
    openItem(id) {
      this.id = id
      this.dialog = true
    },
    saveAndClose() {
      console.error('Save not implemented!!')
      this.dialog = false
    },
  },
})
</script>
