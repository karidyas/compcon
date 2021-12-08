<template>
  <v-card v-show="item" flat outlined class="mb-8">
    <v-toolbar dense color="primary">
      <div class="heading h3 pa-1 white--text">NPC EDITOR</div>
      <v-spacer />
      <v-btn icon @click="$emit('exit')"><v-icon large color="white">mdi-close</v-icon></v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row justify="space-between" align="start">
        <v-col>
          <slot name="upper" />
        </v-col>
        <v-col cols="3" class="text-center">
          <v-combobox
            v-model="item.Labels"
            small-chips
            multiple
            outlined
            hide-details
            label="GM Labels"
          />
          <v-img :src="item.Image" />
          <v-btn small outlined block color="accent" @click="$refs.imageSelector.open()">
            Change Image
          </v-btn>
          <cc-simple-image-selector ref="imageSelector" @set="item.Image = $event" />
        </v-col>
      </v-row>
      <div><slot name="lower" /></div>
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
                      Do you want to delete the section titled "{{ s.header }}"? This action cannot
                      be undone.
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
              <v-btn color="accent" outlined small v-on="on">
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
      <div class="caption" style="text-transform: uppercase">{{ typeText }} CLOCKS</div>
      <cc-clock
        v-for="(c, i) in item.Clocks"
        :key="`${item.Name}_clock_${i}`"
        :clock="c"
        class="mx-1 my-2"
        @delete="item.DeleteClock(c)"
      />
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="accent" outlined small @click="item.AddClock()">
            <v-icon left>mdi-plus</v-icon>
            Add New Clock
          </v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-2" />
      <div class="caption" style="text-transform: uppercase">{{ typeText }} TABLES</div>
      <cc-rollable-table
        v-for="(t, i) in item.Tables"
        :key="`${item.Name}_table_${i}`"
        :table="t"
        class="mx-1 my-2"
        @delete="item.DeleteTable(t)"
      />
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="accent" outlined small @click="item.AddTable()">
            <v-icon left>mdi-plus</v-icon>
            Add New Table
          </v-btn>
        </v-col>
      </v-row>
      <v-divider class="my-2" />
      <div class="caption" style="text-transform: uppercase">GM NOTES</div>
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
      <v-btn color="primary" @click="$emit('copy')">Duplicate</v-btn>
      <v-btn color="error" @click="$emit('deleteItem')">Delete</v-btn>
      <v-btn color="secondary" @click="$emit('save')">Save and Exit</v-btn>
    </v-card-actions>
  </v-card>
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
import RenderBase from '../../gm/_components/RenderBase.vue'

export default Vue.extend({
  name: 'gm-editor-base',
  components: { TiptapVuetify, RenderBase },
  props: {
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
      return 'Npc'
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
  },
})
</script>
