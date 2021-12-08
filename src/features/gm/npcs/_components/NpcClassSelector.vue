<template>
  <v-col>
    <v-btn large block color="primary" class="white--text" @click="dialog = true">
      {{ item.Class.Name }}
    </v-btn>

    <v-dialog v-model="dialog">
      <v-card>
        <v-toolbar dense color="primary">
          <span class="heading h6 white--text">Select Template</span>
          <v-spacer />
          <v-btn icon color="white" @click="dialog = false"><v-icon large>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <panel-view ref="view">
          <template slot="left">
            <v-row dense>
              <v-col>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  dense
                  hide-details
                  outlined
                  clearable
                />
              </v-col>
            </v-row>
            <v-divider class="my-2 " />
            <v-row dense style="max-height: calc(100% - 145px); overflow-y: scroll">
              <v-data-table
                dense
                :items="classes"
                :headers="headers"
                :search="search"
                group-by="Role"
                hide-default-footer
                hide-default-header
                no-results-text="No NPC Classes Found"
                class="transparent"
                style="min-width: 100%"
                disable-pagination
              >
                <template v-slot:group[`header`]`="h" class="transparent">
                  <div class="primary sliced">
                    <span v-if="h.group" class="heading white--text ml-2 text-uppercase">
                      <v-icon v-if="h.group.toLowerCase() === 'biological'" dark>
                        mdi-heart-pulse
                      </v-icon>
                      <v-icon v-else dark>cci-role-{{ h.group }}</v-icon>
                      <span v-if="Array.isArray(h.group)" v-html="h.group.join(', ')" />
                      <span v-else v-html="h.group" />
                    </span>
                  </div>
                </template>
                <template v-slot:item[`Name`]`="{ item }">
                  <v-btn
                    block
                    outlined
                    tile
                    small
                    :color="item.RoleColor"
                    class="my-1"
                    @click="selected = item"
                  >
                    {{ item.Name }}
                    <v-scroll-x-transition leave-absolute>
                      <v-icon v-if="selected === item" right color="accent">
                        mdi-chevron-triple-right
                      </v-icon>
                    </v-scroll-x-transition>
                  </v-btn>
                </template>
              </v-data-table>
            </v-row>
            <v-divider class="mt-2" />
            <v-row justify="center" dense class="mb-n10">
              <v-col cols="10">
                <v-btn large block color="primary" :disabled="!selected" @click="AddNpc()">
                  <v-icon left>mdi-plus</v-icon>
                  <span v-if="selected">Add New {{ selected.Name }}</span>
                  <span v-else>Select NPC Class</span>
                </v-btn>
                <v-btn outlined block small class="mt-1" to="/gm/npc-roster">
                  <v-icon left>mdi-chevron-left</v-icon>
                  Return to NPC Roster
                </v-btn>
              </v-col>
            </v-row>
          </template>
          <template slot="right">
            <v-container v-if="selected">
              <v-row dense>
                <v-col cols="auto" class="mt-4">
                  <span class="heading mech" style="line-height: 0">
                    {{ selected.Name }}
                  </span>
                </v-col>
                <v-col v-if="selected.InLcp" class="ml-auto mt-n4">
                  <div class="heading h3 text--text">{{ selected.LcpName }}</div>
                </v-col>
                <v-col cols="auto" class="ml-auto text-center mt-n4">
                  <v-icon size="60" :color="selected.Color">{{ selected.RoleIcon }}</v-icon>
                  <div class="overline mt-n1">{{ selected.Role }}</div>
                </v-col>
              </v-row>
              <p class="flavor-text panel pa-2 stark--text" v-html-safe="selected.Flavor" />
              <span class="heading h3 accent--text">Tactics</span>
              <p class="body-1" v-html-safe="selected.Tactics" />
              <v-divider class="mb-3" />
              <v-row dense align="center">
                <v-col>
                  <v-btn-toggle
                    v-model="tierPreview"
                    dense
                    mandatory
                    active-class="accent--text"
                    class="mb-2"
                  >
                    <v-btn :value="1">
                      <v-icon left>cci-rank-1</v-icon>
                      Tier 1
                    </v-btn>
                    <v-btn :value="2">
                      <v-icon left>cci-rank-2</v-icon>
                      Tier 2
                    </v-btn>
                    <v-btn :value="3">
                      <v-icon left>cci-rank-3</v-icon>
                      Tier 3
                    </v-btn>
                  </v-btn-toggle>
                  <v-row dense no-gutters>
                    <editable-attribute
                      attr="HULL"
                      :val="selected.Stats.Hull(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="AGI"
                      :val="selected.Stats.Agility(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="SYS"
                      :val="selected.Stats.Systems(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="ENG"
                      :val="selected.Stats.Engineering(tierPreview)"
                      :color="selected.Color"
                    />
                  </v-row>
                  <v-divider class="my-2" />
                  <v-row dense no-gutters>
                    <editable-attribute
                      attr="STRUCTURE"
                      :val="selected.Stats.Structure(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="ARMOR"
                      :val="selected.Stats.Armor(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="HP"
                      :val="selected.Stats.HP(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="REACTOR"
                      :val="selected.Stats.Stress(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      v-if="selected.Role.toLowerCase() !== 'biological'"
                      attr="HEAT CAPACITY"
                      :val="selected.Stats.HeatCapacity(tierPreview)"
                      :color="selected.Color"
                    />
                  </v-row>
                  <v-row dense no-gutters>
                    <editable-attribute
                      attr="SPEED"
                      :val="selected.Stats.Speed(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="SAVE"
                      :val="selected.Stats.Save(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="EVADE"
                      :val="selected.Stats.Evade(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="E-DEFENSE"
                      :val="selected.Stats.EDefense(tierPreview)"
                      :color="selected.Color"
                    />
                    <editable-attribute
                      attr="SENSOR"
                      :val="selected.Stats.Sensor(tierPreview)"
                      :color="selected.Color"
                    />
                  </v-row>
                  <v-divider class="my-2" />
                  <v-row dense no-gutters>
                    <editable-attribute attr="ACTIVATIONS" :val="1" :color="selected.Color" />
                    <editable-attribute
                      attr="SIZE"
                      :val="
                        selected.Stats.Sizes(tierPreview)
                          .join(' or ')
                          .replace('0.5', '½')
                      "
                      :color="selected.Color"
                    />
                  </v-row>
                </v-col>
              </v-row>
              <cc-title small :color="selected.Color" class="mt-2">
                Base Features
              </cc-title>
              <v-row dense>
                <v-col v-for="f in selected.BaseFeatures" :key="f.ID" cols="12">
                  <cc-npc-feature-card :feature="f" :tier="tierPreview" />
                </v-col>
              </v-row>
              <cc-title
                v-if="selected.OptionalFeatures.length"
                small
                :color="selected.Color"
                class="mt-2"
              >
                Optional Features
              </cc-title>
              <v-row dense>
                <v-col v-for="f in selected.OptionalFeatures" :key="f.ID" cols="12">
                  <cc-npc-feature-card :feature="f" :tier="tierPreview" />
                </v-col>
              </v-row>
            </v-container>

            <v-row v-else align="center" justify="center" style="width: 100%; height: 100%;">
              <v-col cols="auto">
                <span class="heading h1 subtle--text text--lighten-2">select npc class</span>
              </v-col>
            </v-row>
          </template>
        </panel-view>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CompendiumStore, NpcStore } from '@/store'
import { Npc } from '@/class'
import PanelView from '../../_components/PanelView.vue'

export default Vue.extend({
  name: 'npc-class-selector',
  props: {
    item: { type: Object, required: true },
  },
  components: { PanelView },
  data: () => ({
    dialog: false,
    selected: null,
    search: '',
    grouping: null,
    headers: [{ text: 'Name', value: 'Name', align: 'left' }],
    classes: [],
  }),
  watch: {
    selectedClass() {
      this.$refs.view.resetScroll()
    },
  },
  created() {
    const store = getModule(CompendiumStore, this.$store)
    this.classes = store.NpcClasses
  },
  methods: {
    AddNpc() {
      const store = getModule(NpcStore, this.$store)
      store.addNpc(new Npc(this.selectedClass, this.$refs.card.tierPreview))
      this.$store.dispatch('cloudSync', { callback: null, condition: 'selectedreate' })
      this.$router.push('./npc-roster')
    },
  },
})
</script>
