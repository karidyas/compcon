<template>
  <div id="wrapper">
    <main-title @logupdate="ccLog('update')" />
    <c-c-log v-show="$vuetify.breakpoint.mdAndUp" ref="log" />
    <v-container style="height: calc(100vh - 135px)">
      <v-row justify="space-between" style="height: 100%">
        <main-btn
          icon="cci-compendium"
          :to="'/compendium'"
          help="Equipment Database"
          @hover="ccLog('compendium')"
        >
          Compendium
        </main-btn>
        <main-btn
          icon="cci-pilot"
          :to="'/pilot_management'"
          help="Manage Pilots"
          @hover="ccLog('pilot')"
        >
          Pilot Roster
        </main-btn>
        <main-btn
          icon="cci-encounter"
          :to="'/gm'"
          help="Manage NPCs and Encounters"
          @hover="ccLog('gm')"
        >
          GM Toolkit
        </main-btn>
        <main-btn
          icon="cci-content-manager"
          help="Import Content Packs"
          @hover="ccLog('content')"
          @clicked="$refs.contentModal.show()"
        >
          Content Manager
        </main-btn>
      </v-row>
    </v-container>

    <main-footer @log="ccLog($event)" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MainTitle from './_components/MainTitle.vue'
import MainBtn from './_components/MainBtn.vue'
import MainFooter from './_components/Footer.vue'
import CCLog from '../main_menu/_components/CCLog.vue'

export default Vue.extend({
  name: 'landing-page',
  components: {
    MainTitle,
    MainBtn,
    MainFooter,
    CCLog,
  },
  methods: {
    ccLog(btn: string) {
      switch (btn) {
        case 'compendium':
          this.$refs['log'].print(
            'man compendium',
            'Browse the database of LANCER frames, equipment, and rules'
          )
          break
        case 'pilot':
          this.$refs['log'].print(
            'man pilot-sheet',
            'Create and manage pilots and their mechs, print character sheets, and enable active play mode'
          )
          break
        case 'gm':
          this.$refs['log'].print(
            'man gm-tools',
            'Build and manage NPCs and encounters, and run missions with NPCs and pilots'
          )
          break
        case 'campaign':
          this.$refs['log'].print('man campaigns', 'work in progress')
          break
        case 'content':
          this.$refs['log'].print('man homebrew', 'Manage and create COMP/CON expansion data')
          break
        case 'options':
          this.$refs['log'].print('compcon -settings --verbose', 'Open the options manager')
          break
        case 'about':
          this.$refs['log'].print('compcon --v', 'About COMP/CON')
          break
        case 'help':
          this.$refs['log'].print('compcon --h', 'Open the COMP/CON help page')
          break
        case 'update':
          this.$refs['log'].print(
            'gms-upm compcon changelog -l',
            'View COMP/CON changelog and latest updates'
          )
        default:
          break
      }
    },
  },
})
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: 100vh;
  background: url(../../assets/ui/grid.png);
  animation: 600s scroll infinite linear;
  top: 0;
  left: 0;
}

@keyframes scroll {
  100% {
    background-position: -3000px -3000px;
  }
}
</style>
