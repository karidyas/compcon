<template>
  <v-container v-show="item">
    <v-card flat outlined class="mb-8">
      <v-toolbar dense color="primary">
        <div class="heading h3 pa-1 white--text">{{ typeText }} DATA EDITOR</div>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <v-row justify="space-between" align="center">
          <v-col>
            <slot />
            <v-row>
              <v-col>
                <v-combobox v-model="item.Labels" small-chips multiple outlined label="GM Labels" />
              </v-col>
              <v-col>
                <v-select v-model="item.Campaigns" outlined label="Campaign" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3" class="text-center">
            <v-img :src="item.Image" />
            <v-btn small outlined block color="accent" @click="$refs.imageSelector.open()">
              Change Image
            </v-btn>
            <cc-simple-image-selector ref="imageSelector" @set="item.Image = $event" />
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <div v-if="item.Sections.length">
          <v-row v-for="(s, i) in item.Sections" :key="`section_${i}`" dense>
            <v-col>
              <v-row no-gutters justify="space-between">
                <v-col cols="auto">
                  <div class="heading h3">
                    <cc-short-string-editor large @set="s.header = $event">
                      {{ s.header }}
                    </cc-short-string-editor>
                  </div>
                </v-col>
                <v-col cols="auto">
                  <v-menu offset-x left>
                    <template v-slot:activator="{ on }">
                      <v-btn small icon color="error" class="fadeSelect" v-on="on">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-text>
                        Do you want to delete the section titled "{{ s.header }}"? This action
                        cannot be undone.
                      </v-card-text>
                      <v-divider />
                      <v-card-actions>
                        <v-spacer />
                        <v-btn small color="error" @click="deleteSection(s)">
                          Confirm Deletion
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-col>
              </v-row>
              <v-col cols="12">
                <tiptap-vuetify
                  v-model="s.body"
                  :extensions="extensions"
                  :card-props="{ flat: true, outlined: true }"
                  :toolbar-attributes="$vuetify.theme.dark ? { color: 'black', dark: true } : {}"
                />
              </v-col>
            </v-col>
          </v-row>
        </div>
        <v-row v-else justify="center" align="center">
          <v-col cols="auto">
            <div class="text--disabled">
              <cc-slashes />
              NO SECTION DATA
              <cc-slashes />
            </div>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="auto">
            <v-menu
              v-model="sectionMenu"
              offset-x
              left
              :close-on-click="false"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on }">
                <v-btn color="primary" outlined small v-on="on">
                  <v-icon left>mdi-plus</v-icon>
                  Add New Section
                </v-btn>
              </template>
              <v-card>
                <v-card-text>
                  <v-combobox
                    v-model="newSectionHeader"
                    label="New Section Header"
                    :items="item.SectionSuggestions"
                  />
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn text @click="sectionMenu = false">Cancel</v-btn>
                  <v-spacer />
                  <v-btn color="secondary" @click="addSection">Add</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <v-row class="text-center">
          <v-col>
            <div class="caption">ASSOCIATED CHARACTERS</div>
            <cc-relationship-item
              v-for="(c, i) in item.Characters"
              :key="`assc_char_${i}`"
              :relationship="c"
              itemType="Character"
              :items="allCharacters"
              class="mb-1"
              @delete="deleteAssociation('Characters', c)"
            >
              <cc-tooltip
                v-if="isLink('Characters', c.name)"
                inline
                :content="`Go to Characters / ${c.name}`"
              >
                <v-btn
                  fab
                  x-small
                  color="secondary"
                  elevation="0"
                  class="fadeSelect"
                  @click="goTo('Characters', c.name)"
                >
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
              </cc-tooltip>
            </cc-relationship-item>
            <v-btn
              small
              block
              outlined
              color="primary"
              @click="addAssociation('Characters')"
              class="mt-2 mx-1"
            >
              <v-icon left>mdi-plus</v-icon>
              Add New
            </v-btn>
          </v-col>
          <v-col cols="auto"><v-divider vertical /></v-col>
          <v-col>
            <div class="caption">ASSOCIATED LOCATIONS</div>
            <cc-relationship-item
              v-for="(c, i) in item.Locations"
              :key="`assc_loc_${i}`"
              :relationship="c"
              itemType="Location"
              :items="allLocations"
              class="mb-1"
              @delete="deleteAssociation('Locations', c)"
            >
              <cc-tooltip
                v-if="isLink('Locations', c.name)"
                inline
                :content="`Go to Locations / ${c.name}`"
              >
                <v-btn
                  fab
                  x-small
                  color="secondary"
                  elevation="0"
                  class="fadeSelect"
                  @click="goTo('Locations', c.name)"
                >
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
              </cc-tooltip>
            </cc-relationship-item>
            <v-btn
              small
              block
              outlined
              color="primary"
              @click="addAssociation('Locations')"
              class="mt-2 mx-1"
            >
              <v-icon left>mdi-plus</v-icon>
              Add New
            </v-btn>
          </v-col>
          <v-col cols="auto"><v-divider vertical /></v-col>
          <v-col>
            <div class="caption">ASSOCIATED FACTIONS</div>
            <cc-relationship-item
              v-for="(c, i) in item.Factions"
              :key="`assc_fact_${i}`"
              :relationship="c"
              itemType="Faction"
              :items="allFactions"
              class="mb-1"
              @delete="deleteAssociation('Factions', c)"
            >
              <cc-tooltip
                v-if="isLink('Factions', c.name)"
                inline
                :content="`Go to Factions / ${c.name}`"
              >
                <v-btn
                  fab
                  x-small
                  color="secondary"
                  elevation="0"
                  class="fadeSelect"
                  @click="goTo('Factions', c.name)"
                >
                  <v-icon>mdi-open-in-new</v-icon>
                </v-btn>
              </cc-tooltip>
            </cc-relationship-item>
            <v-btn
              small
              block
              outlined
              color="primary"
              @click="addAssociation('Factions')"
              class="mt-2 mx-1"
            >
              <v-icon left>mdi-plus</v-icon>
              Add New
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <div class="caption">{{ typeText }} CLOCKS</div>
        <cc-clock
          v-for="(c, i) in item.Clocks"
          :key="`${item.Name}_clock_${i}`"
          :clock="c"
          class="mx-1 my-2"
          @delete="item.DeleteClock(c)"
        />
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn color="primary" outlined small @click="item.AddClock()">
              <v-icon left>mdi-plus</v-icon>
              Add New Clock
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <div class="caption">{{ typeText }} TABLES</div>
        <cc-rollable-table
          v-for="(t, i) in item.Tables"
          :key="`${item.Name}_table_${i}`"
          :table="t"
          class="mx-1 my-2"
          @delete="item.DeleteTable(t)"
        />
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn color="primary" outlined small @click="item.AddTable()">
              <v-icon left>mdi-plus</v-icon>
              Add New Table
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <div class="caption">GM NOTES</div>
        <tiptap-vuetify
          v-model="item.Notes"
          :extensions="extensions"
          :card-props="{ flat: true, outlined: true }"
          :toolbar-attributes="$vuetify.theme.dark ? { color: 'black', dark: true } : {}"
        />
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="primary" @click="printDialog = true">Print</v-btn>
        <v-dialog v-model="printDialog">
          <v-card>
            <v-toolbar dense>
              <span class="heading h3">Print Preview</span>
              <v-spacer />
              <v-btn icon @click="printDialog = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-toolbar>
            <v-card-text>
              <render-base :item="item">
                <slot name="print" />
              </render-base>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-spacer />
        <v-btn color="primary" @click="copy">Duplicate</v-btn>
        <v-btn color="error" @click="deleteItem">Delete</v-btn>
        <v-btn color="secondary" @click="saveExit">Save and Exit</v-btn>
      </v-card-actions>
    </v-card>
    <v-footer fixed>
      <v-btn small @click="$emit('exit')">
        <v-icon left>mdi-chevron-left</v-icon>
        Return to Collection
      </v-btn>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  BulletList,
  OrderedList,
  ListItem,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'
import RenderBase from './RenderBase.vue'
import CCRelationshipItem from '@/ui/components/CCRelationshipItem.vue'

export default Vue.extend({
  name: 'gm-editor-base',
  components: { TiptapVuetify, RenderBase, CCRelationshipItem },
  props: {
    new: { type: Boolean },
    item: { type: Object, required: true },
  },
  data: () => ({
    printDialog: false,
    sectionMenu: false,
    newSectionHeader: '',
    extensions: [
      History,
      Blockquote,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Code,
      HorizontalRule,
      HardBreak,
    ],
  }),
  computed: {
    typeText() {
      if (!this.item) return 'ERR'
      return this.item.ItemType.toUpperCase()
    },
    allCharacters() {
      if (!this.$store.getters['character/getCharacters']) return []
      return this.$store.getters['character/getCharacters'].filter(x => x.Name !== this.item.Name)
    },
    allFactions() {
      if (!this.$store.getters['faction/getFactions']) return []
      return this.$store.getters['faction/getFactions'].filter(x => x.Name !== this.item.Name)
    },
    allLocations() {
      if (!this.$store.getters['location/getLocations']) return []
      return this.$store.getters['location/getLocations'].filter(x => x.Name !== this.item.Name)
    },
  },
  methods: {
    addSection() {
      this.item.AddSection({ header: this.newSectionHeader, body: '' })
      this.newSectionHeader = ''
      this.sectionMenu = false
    },
    deleteSection(s) {
      const idx = this.item.Sections.findIndex(x => x.header === s.header && x.body === s.body)
      if (idx === -1) return
      this.item.Sections.splice(idx, 1)
    },
    addAssociation(type) {
      this.item.AddRelationship(type, { name: '', relationship: '' })
    },
    deleteAssociation(type, r) {
      this.item.DeleteRelationship(type, r)
    },
    deleteItem() {
      if (!this.new) this.item.delete()
      this.$emit('exit')
    },
    copy() {
      if (!this.new) this.item.copy()
      this.$emit('exit')
    },
    saveExit() {
      if (this.new) this.item.addNew()
      else this.item.save()
      this.$emit('exit')
    },
    isLink(type, name) {
      return this[`all${type}`].some(x => x.Name === name)
    },
    goTo(type, name) {
      const e = this[`all${type}`].find(x => x.Name === name)
      if (!e) return
      this.item.save()
      console.log(`../${type.toLowerCase()}/${e.ID}`)
      this.$router.push({ name: `gm-${type.toLowerCase()}-edit`, params: { id: e.ID } })
    },
  },
})
</script>
