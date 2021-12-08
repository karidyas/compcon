<template>
  <div>
    <gm-collection-view
      title="NPCs"
      item-type="NPC"
      :items="npcs"
      @add-new="addNew()"
      @open="openItem($event)"
    />
    <v-dialog v-model="dialog" fullscreen>
      <v-card flat>
        <editor
          v-if="dialog"
          :item="selected"
          @exit="dialog = false"
          @copy="copyItem()"
          @deleteItem="deleteItem()"
          @save="saveAndClose()"
        >
          <builder slot="upper" :item="selected" />
          <features slot="lower" :item="selected" />
        </editor>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GmCollectionView from '../_views/GMCollectionView.vue'
import Editor from './editor.vue'
import Builder from './builder.vue'
import Features from './features.vue'
import { getModule } from 'vuex-module-decorators'
import { CompendiumStore, NpcStore } from '@/store'
import { Npc } from '@/class'

export default Vue.extend({
  name: 'npc-roster',
  components: { GmCollectionView, Editor, Builder, Features },
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
      // TODO: check for and ask to update instances on save
      console.log('not yet implemented')
    },
  },
})
</script>
