<template>
  <v-container>
    <v-card flat>
      <v-toolbar>
        <v-row dense align="center">
          <v-col cols="auto">
            <span class="heading h2">{{ title }}</span>
          </v-col>
          <v-col class="pl-4">
            <v-autocomplete
              v-model="search"
              :placeholder="`Search ${title}`"
              :items="items"
              item-text="Name"
              item-value="Name"
              dense
              hide-details
              clearable
            />
          </v-col>
          <v-col cols="2" class="ml-auto">
            <v-select
              v-model="grouping"
              :items="['None', 'Campaigns', 'Labels', 'Class', 'Tier']"
              label="Group By"
              hide-details
              outlined
              dense
            />
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="sorting"
              :items="['Name', 'Campaigns', 'Labels', 'Class', 'Tier']"
              label="Sort By"
              hide-details
              outlined
              dense
            />
          </v-col>
          <v-col cols="auto">
            <v-menu left bottom offset-x offset-y :close-on-content-click="false" max-width="40vw">
              <template v-slot:activator="{ on }">
                <v-btn fab small dark color="primary" v-on="on">
                  <v-icon>mdi-filter</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-toolbar dense class="heading h4">
                  Labels
                </v-toolbar>
                <v-card-text>
                  <v-btn-toggle multiple>
                    <v-btn v-for="(l, i) in allLabels" :key="`label_toggle_${i}`">{{ l }}</v-btn>
                  </v-btn-toggle>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-row>
        <v-col cols="auto">
          <v-btn-toggle v-model="view" mandatory tile>
            <v-btn small icon value="big-grid">
              <v-icon color="accent">mdi-view-grid</v-icon>
            </v-btn>
            <v-btn small icon value="grid">
              <v-icon color="accent">mdi-grid</v-icon>
            </v-btn>
            <v-btn small icon value="list">
              <v-icon color="accent">mdi-view-list</v-icon>
            </v-btn>
            <v-btn small icon value="table">
              <v-icon color="accent">mdi-table</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-card-text>
        <item-card-grid
          :item-type="itemType"
          :items="searchedItems"
          :big="view === 'big-grid'"
          :list="view === 'list'"
          :table="view === 'table'"
          :grouping="grouping"
          :sorting="sorting"
          @open="$emit('open', $event)"
        />
      </v-card-text>
    </v-card>
    <v-row justify="center" align="center" class="mt-4">
      <v-col cols="8">
        <v-btn x-large block color="primary" @click="$emit('add-new')">
          <v-icon large left>mdi-plus</v-icon>
          Add New {{ itemType }}
        </v-btn>
      </v-col>
    </v-row>
    <v-footer fixed>
      <v-btn small to="/gm">
        <v-icon left>mdi-chevron-left</v-icon>
        Return to GM Menu
      </v-btn>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import _ from 'lodash'
import Vue from 'vue'
import ItemCardGrid from '../_views/ItemCardGrid.vue'

export default Vue.extend({
  name: 'characters-roster',
  components: { ItemCardGrid },
  props: {
    items: { type: Array, required: true },
    itemType: { type: String, required: true },
    title: { type: String, required: true },
  },
  data: () => ({
    search: '',
    view: 'big-grid',
    sorting: 'Name',
    grouping: 'None',
    hiddenLabels: [],
    hiddenCampaigns: [],
  }),
  computed: {
    searchedItems() {
      // let i = this.items
      // if (this.hiddenLabels.length)
      //   i = i.filter(x => !x.Labels.some(y => this.hiddenLabels.includes(y)))
      // if (this.hiddenCampaigns.length)
      //   i = i.filter(x => !x.Campaigns.some(y => this.hiddenCampaigns.includes(y)))
      // if (!this.search) return i
      // return i.filter(x => x.Name.includes(this.search))
      if (!this.search) return this.items
      return this.items.filter(x => x.Name.includes(this.search))
    },
    visibleLabels() {
      return this.allLabels.filter(x => !this.hiddenLabels.includes(x))
    },
    allLabels() {
      return _.uniq(this.items.flatMap(x => x.Labels))
    },
  },
})
</script>
