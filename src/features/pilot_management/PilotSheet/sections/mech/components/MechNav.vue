<template>
  <div class="nav-body elevation-10">
    <div id="cap" />
    <div v-if="$vuetify.breakpoint.mdAndUp" class="d-inline">
      <!-- Uncomment if/when pilot analytics are done -->
      <!-- <cc-tooltip inline delayed content="Active Mech Configuration">
        <cc-nav-item tile depressed :selected="selected === 0" @click="$emit('set-page', 0)">
          MECH CONFIGURATION
        </cc-nav-item>
      </cc-tooltip>
      <cc-tooltip simple inline content="Feature In Development">
        <cc-nav-item disabled :selected="selected === 1" @click="$emit('set-page', 1)">
          COMBAT ANALYTICS
        </cc-nav-item>
      </cc-tooltip> -->
      <cc-tooltip inline delayed content="Pilot Sheet">
        <v-btn icon fab x-small outlined class="mx-4 unskew" dark @click="toPilotSheet()">
          <v-icon large>cci-pilot</v-icon>
        </v-btn>
      </cc-tooltip>
      <cc-tooltip inline delayed content="Active Mode">
        <v-btn icon fab x-small outlined class="mr-4 unskew" dark :to="`/active/${pilot.ID}`">
          <v-icon large color="white">cci-activate</v-icon>
        </v-btn>
      </cc-tooltip>
    </div>
    <!-- Remove this div and uncomment below if/when pilot analytics are done -->
    <div v-else class="d-inline">
      <v-btn icon fab x-small outlined class="mx-4 unskew" dark @click="toPilotSheet()">
        <v-icon large>cci-pilot</v-icon>
      </v-btn>
      <v-btn icon fab x-small outlined class="mr-4 unskew" dark :to="`/active/${pilot.ID}`">
        <v-icon large color="white">cci-activate</v-icon>
      </v-btn>
    </div>

    <!-- <v-menu v-else open-on-hover>
        <template v-slot:activator="{ on }">
        <v-btn light icon color="white" style="z-index: 9" class="unskew pl-2 pr-0" v-on="on">
          <v-icon large>mdi-book-open-page-variant</v-icon>
          <v-icon>arrow_drop_up</v-icon>
        </v-btn>
      </template>
      <v-list dense class="heading h3">
        <v-list-item @click="$emit('set-page', 0)">MECH CONFIGURATION</v-list-item>
        <v-list-item @click="toPilotSheet()">PILOT SHEET</v-list-item>
        <v-list-item tile depressed :selected="selected === 0" :to="`/active/${pilot.ID}`">
          ACTIVE MODE
        </v-list-item>
        <v-list-item disabled @click="$emit('set-page', 1)">COMBAT ANALYTICS</v-list-item>
      </v-list>
    </v-menu> -->

    <v-divider vertical class="mx-2" />
    <div id="divider" />
    <v-menu offset-y top>
      <template v-slot:activator="{ on: menu }">
        <v-btn class="unskew ml-2" icon dark v-on="menu">
          <cc-tooltip inline delayed content="Mech Options">
            <v-icon>mdi-cog</v-icon>
          </cc-tooltip>
        </v-btn>
      </template>
      <v-list two-line subheader>
        <v-subheader class="heading h2 white--text primary py-0 px-2">Mech Options</v-subheader>
        <v-list-item @click="$refs.printDialog.show()">
          <v-list-item-icon class="ma-0 mr-2 mt-3">
            <v-icon>mdi-printer</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Print</v-list-item-title>
            <v-list-item-subtitle>Print a tabletop-ready mech sheet</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$refs.statblockDialog.show()">
          <v-list-item-icon class="ma-0 mr-2 mt-3">
            <v-icon>mdi-file-document-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Generate Statblock</v-list-item-title>
            <v-list-item-subtitle>
              Get a plaintext representation of this mech configuration
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item @click="$emit('delete')">
          <v-list-item-icon class="ma-0 mr-2 mt-3">
            <v-icon color="error">mdi-delete</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="error--text">Delete Mech</v-list-item-title>
            <v-list-item-subtitle class="error--text">
              Remove mech from the Hangar
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu offset-y top>
      <template v-slot:activator="{ on: menu }">
        <v-btn class="unskew ml-2" icon dark v-on="menu">
          <cc-tooltip inline delayed content="Layout Options">
            <v-icon>mdi-view-grid-plus</v-icon>
          </cc-tooltip>
        </v-btn>
      </template>
      <v-list subheader>
        <v-subheader class="heading h2 white--text primary py-0 px-4">Layout Options</v-subheader>
        <v-list-item-group>
          <v-list-item @click.stop>
            <v-list-item-icon class="ma-0 mr-2 mt-3">
              <v-icon>mdi-view-array</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Tabbed View</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item disabled>
            <v-list-item-icon class="ma-0 mr-2 mt-3">
              <v-icon>mdi-playlist-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <cc-tooltip simple content="Feature In Development">
                <v-list-item-title>Manage Custom Views</v-list-item-title>
                <v-list-item-subtitle>Feature In Development</v-list-item-subtitle>
              </cc-tooltip>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <print-dialog ref="printDialog" class="unskew" :pilot="pilot" />
    <statblock-dialog ref="statblockDialog" class="unskew" :pilot="pilot" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import StatblockDialog from '../../../components/StatblockDialog.vue'
import PrintDialog from '../../../components/PrintDialog.vue'

export default Vue.extend({
  name: 'mech-nav',
  components: { StatblockDialog, PrintDialog },
  props: {
    pilot: {
      type: Object,
      required: true,
    },
    selected: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toPilotSheet() {
      this.$router.push({ name: 'pilot_sheet' })
    },
  },
})
</script>

<style scoped>
.nav-body {
  position: fixed;
  bottom: 20px;
  right: -60px;
  min-height: 40px;
  padding: 5px 80px 5px 20px;
  transform: skew(-0.65rad);
  background-color: var(--v-primary-base);
  color: white;
  z-index: 10;
}

#divider {
  width: 2px;
  min-width: 2px;
  height: 47px;
  right: 180px;
  top: 0;
  z-index: 11;
  background-color: white;
  position: absolute;
}

.unskew {
  transform: skew(0.65rad);
}
</style>
