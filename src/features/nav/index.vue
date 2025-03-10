<template>
  <v-app-bar
    v-show="mode"
    app
    fixed
    top
    color="primary"
    class="clipped-large no-print"
    dark
    dense
    style="z-index: 50"
  >
    <v-tooltip bottom open-delay="500ms">
      <template v-slot:activator="{ on }">
        <v-btn text icon v-on="on" @click="historyNav(-1)">
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
      <span>Back</span>
    </v-tooltip>

    <v-tooltip bottom open-delay="500ms">
      <template v-slot:activator="{ on }">
        <v-btn text icon v-on="on" @click="historyNav(1)">
          <v-icon dark>mdi-arrow-right</v-icon>
        </v-btn>
      </template>
      <span>Forward</span>
    </v-tooltip>

    <v-tooltip bottom open-delay="500ms">
      <template v-slot:activator="{ on }">
        <v-btn text icon v-on="on" @click="home()">
          <v-icon dark>mdi-home</v-icon>
        </v-btn>
      </template>
      <span>Main Menu</span>
    </v-tooltip>

    <v-tooltip bottom open-delay="500ms">
      <template v-slot:activator="{ on }">
        <v-btn text icon to="/compendium" v-on="on">
          <v-icon color="white">mdi-book</v-icon>
        </v-btn>
      </template>
      <span>Compendium</span>
    </v-tooltip>

    <v-divider vertical dark class="ml-2 mr-2" />

    <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp">
      <span class="heading">COMP/CON</span>
      <span class="flavor-text white--text">{{ $appVersion }}</span>
    </v-toolbar-title>

    <v-spacer />

    <div v-if="$vuetify.breakpoint.mdAndUp">
      <pilot-mode v-if="mode === 'pilot'" />
      <compendium-mode v-if="mode === 'compendium'" />
      <encounter-mode v-if="mode === 'encounter'" />
    </div>

    <v-divider v-if="$vuetify.breakpoint.mdAndUp && isAuthed" vertical dark class="ml-2 mr-2" />

    <cc-tooltip v-if="isAuthed" bottom content="Open cloud account menu">
      <v-btn icon dark @click="$refs.cloudModal.show()">
        <v-icon>mdi-cloud-sync-outline</v-icon>
      </v-btn>
    </cc-tooltip>

    <v-divider v-if="$vuetify.breakpoint.mdAndUp" vertical dark class="ml-2 mr-2" />

    <v-menu nudge-bottom="40px">
      <template v-slot:activator="{ on }">
        <v-btn text icon v-on="on">
          <v-icon dark>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item @click="$refs.contentModal.show()">Manage Content</v-list-item>
        <v-list-item @click="$refs.optionsModal.show()">Options</v-list-item>
        <v-list-item @click="$refs.aboutModal.show()">About</v-list-item>
        <v-list-item @click="$refs.creditsModal.show()">Credits</v-list-item>
        <v-list-item @click="$refs.helpModal.show()">Help</v-list-item>
        <v-divider />
        <v-list-item target="_blank" href="https://www.patreon.com/compcon">
          Support COMP/CON
        </v-list-item>
      </v-list>
    </v-menu>

    <v-spacer style="max-width: 20px" />

    <cc-solo-dialog
      ref="contentModal"
      no-title-clip
      no-pad
      large
      no-confirm
      title="Manage Content Packs"
    >
      <content-page />
    </cc-solo-dialog>

    <cc-solo-dialog
      ref="optionsModal"
      large
      no-confirm
      no-pad
      no-title-clip
      title="Options & User Profile"
    >
      <options-page />
    </cc-solo-dialog>
    <cc-solo-dialog ref="aboutModal" large no-confirm title="About"><about-page /></cc-solo-dialog>
    <cc-solo-dialog ref="creditsModal" large no-confirm title="Credits">
      <credits-page />
    </cc-solo-dialog>
    <cc-solo-dialog ref="helpModal" large no-confirm title="Help"><help-page /></cc-solo-dialog>
    <cc-solo-dialog ref="creditsModal" fullscreen no-confirm title="Credits">
      <credits-page />
    </cc-solo-dialog>
    <cc-solo-dialog ref="cloudModal" large no-confirm title="Cloud Account">
      <cloud-page />
    </cc-solo-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import HelpPage from './pages/Help.vue'
import AboutPage from './pages/About.vue'
import CreditsPage from './pages/Credits.vue'
import OptionsPage from './pages/Options/index.vue'
import ContentPage from './pages/ExtraContent/index.vue'
import CloudPage from './pages/Cloud.vue'
import activePilot from '../pilot_management/mixins/activePilot'

import PilotMode from './modes/pilot.vue'
import EncounterMode from './modes/encounter.vue'
import CompendiumMode from './modes/compendium.vue'

import vueMixins from '@/util/vueMixins'
import { getModule } from 'vuex-module-decorators'
import { PilotManagementStore, UserStore, NavStore } from '@/store'
import { Auth } from 'aws-amplify'

export default vueMixins(activePilot).extend({
  name: 'cc-nav',
  components: {
    HelpPage,
    AboutPage,
    CreditsPage,
    OptionsPage,
    ContentPage,
    PilotMode,
    EncounterMode,
    CompendiumMode,
    CloudPage,
  },
  props: {
    pilotManagement: { type: Boolean },
    encounter: { type: Boolean },
  },
  data: () => ({
    aboutDialog: false,
    helpDialog: false,
    optionsDialog: false,
  }),
  async mounted() {
    await Auth.currentAuthenticatedUser()
  },
  computed: {
    mode(): string {
      return getModule(NavStore, this.$store).NavMode
    },
    unsaved() {
      return getModule(PilotManagementStore, this.$store).unsavedCloudPilots
    },
    isAuthed() {
      return getModule(UserStore, this.$store).IsLoggedIn
    },
    syncTooltip(): string {
      if (!this.unsaved.length) return 'Pilot data synced'
      return (
        '<div class="text-center"><b>LOCAL CHANGES<br></b>' +
        this.unsaved.map(p => `Pilot::${p.Callsign}`).join('<br>') +
        '<br><span class="caption">Click to save changes to your cloud account</span></div>'
      )
    },
  },
  methods: {
    sync() {
      // getModule(UserStore, this.$store).cloudSync({
      //   callback: (status, message) => this.$notify(status, message),
      // })
    },
    home() {
      this.$router.push('/')
    },
    historyNav(dir: number) {
      this.$router.go(dir)
    },
  },
})
</script>
