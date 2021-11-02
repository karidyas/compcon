<template>
  <v-card v-show="item" flat outlined class="mb-8">
    <v-toolbar dense color="primary">
      <div class="heading h3 pa-1 white--text">NPC EDITOR</div>
      <v-spacer />
      <v-btn icon large @click="$emit('exit')">
        <v-icon color="white" large>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-row>
            <v-col cols="auto">
              <v-icon size="70" class="mr-n5 mt-n4">{{ item.Icon }}</v-icon>
            </v-col>
            <v-col>
              <div class="heading mech">
                <cc-short-string-editor large :placeholder="item.Name" @set="item.Name = $event">
                  <span class="heading-block">
                    {{ item.Name }}
                  </span>
                </cc-short-string-editor>
              </div>
              <div class="flavor-text mt-2">
                <cc-short-string-editor
                  large
                  :placeholder="item.Subtitle"
                  @set="item.Subtitle = $event"
                >
                  <b
                    v-if="item.Subtitle"
                    class="heading-block stark--text"
                    v-html="item.Subtitle"
                  />
                  <i v-else class="heading-block subtle--text" v-html="'Add GM Summary'" />
                </cc-short-string-editor>
              </div>
            </v-col>
          </v-row>
          <v-row dense justify="space-around" align="start">
            <v-col><class-selector :item="item" /></v-col>
            <v-col><template-selector :item="item" /></v-col>
            <v-col><tier-selector :item="item" /></v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-combobox
            v-model="item.Labels"
            small-chips
            multiple
            outlined
            hide-details
            dense
            label="GM Labels"
          />
          <v-combobox
            v-model="item.Labels"
            small-chips
            multiple
            outlined
            hide-details
            dense
            label="NPC Tag"
            class="mt-1"
          />
          <v-combobox
            v-model="item.Labels"
            small-chips
            multiple
            outlined
            hide-details
            dense
            label="Campaign"
            class="mt-1"
          />
        </v-col>
      </v-row>
      <v-row justify="space-between" align="start">
        <v-col>
          <statblock :item="item">
            <v-row>
              <v-col>
                <v-divider />
              </v-col>
              <v-col cols="auto" class="mt-n1">
                <span
                  :class="`heading ${item.Class.Color}--text`"
                  style="font-size: 35px; line-height: 0"
                >
                  {{ item.Tier === 'custom' ? 'Customized' : `T${item.Tier}` }}
                  {{ item.Class.Name }}
                  <span v-if="item.Templates">
                    {{ item.Templates.map(t => t.Name).join(' ') }}
                  </span>
                </span>
              </v-col>
              <v-col>
                <v-divider />
              </v-col>
            </v-row>
            <p v-html-safe="item.Class.Tactics" />
          </statblock>
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
      <v-row>
        <v-col cols="12"><feature-block :item="item" /></v-col>

        <v-col cols="12" class="text-right">
          <power-rating :item="item" />
        </v-col>
      </v-row>
      <div class="caption">NPC CLOCKS</div>
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
      <div class="caption">NPC TABLES</div>
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
  <!-- <v-footer fixed>
      <v-btn small @click="$emit('exit')">
        <v-icon left>mdi-chevron-left</v-icon>
        Return to Collection
      </v-btn>
    </v-footer> -->
</template>

<script lang="ts">
import { getModule } from 'vuex-module-decorators'
import { CompendiumStore } from '@/store'
import Statblock from './components/Statblock.vue'
import ClassSelector from './components/ClassSelector.vue'
import TemplateSelector from './components/TemplateSelector.vue'
import TierSelector from './components/TierSelector.vue'
import PowerRating from './components/PowerRating.vue'
import FeatureBlock from './components/FeatureBlock.vue'
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
import RenderBase from '../../../gm/_components/RenderBase.vue'

export default Vue.extend({
  name: 'gm-editor-base',
  components: {
    TiptapVuetify,
    RenderBase,
    Statblock,
    ClassSelector,
    TemplateSelector,
    TierSelector,
    PowerRating,
    FeatureBlock,
  },
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
    availableClasses() {
      return getModule(CompendiumStore, this.$store).NpcClasses
    },
  },
  methods: {
    copy() {
      console.log('not yet implemented')
    },
    deleteItem() {
      console.log('not yet implemented')
    },
    saveExit() {
      console.log('not yet implemented')
    },
  },
})
</script>
