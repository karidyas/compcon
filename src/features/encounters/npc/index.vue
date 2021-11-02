<template>
  <div>
    <gm-collection-view
      title="NPCs"
      item-type="NPC"
      :items="npcs"
      @add-new="addNew()"
      @open="openItem($event)"
    />
    <v-dialog v-model="dialog">
      <v-card flat>
        <editor v-if="dialog" :item="selected" @close="saveAndClose()" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GmCollectionView from '../_views/GMCollectionView.vue'
import Editor from './editor.vue'
import { getModule } from 'vuex-module-decorators'
import { CompendiumStore, NpcStore } from '@/store'
import { Npc } from '@/class'

export default Vue.extend({
  name: 'npc-roster',
  components: { GmCollectionView, Editor },
  data: () => ({
    id: '',
    dialog: false,
    selected: null,
  }),
  computed: {
    npcs() {
      const store = getModule(NpcStore, this.$store)
      return store.Npcs
    },
  },
  methods: {
    openItem(id) {
      this.id = id
      this.dialog = true
    },
    addNew() {
      const store = getModule(CompendiumStore, this.$store)

      this.selected = new Npc(store.NpcClasses[0])
      this.dialog = true
    },
    SaveAndClose() {
      console.log('not yet implemented')
    },
  },
})
</script>
