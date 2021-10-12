<template>
  <div id="wrapper">
    <g-m-log v-show="$vuetify.breakpoint.mdAndUp" ref="log" />
    <div style="height: 75px" />
    <v-container style="height: calc(100vh - 35px)">
      <v-row justify="space-between" style="height: 100%">
        <main-btn icon="cci-npc-class" :to="'/compendium'" help="Manage NPCs" @hover="ccLog('npc')">
          NPC Roster
        </main-btn>
        <main-btn
          icon="cci-encounter"
          :to="'/pilot_management'"
          help="Manage Encounters"
          @hover="ccLog('encounter')"
        >
          Encounter Library
        </main-btn>
        <main-btn
          icon="cci-activate"
          help="Start or continue an Encounter"
          @hover="ccLog('runner')"
          @clicked="$refs.contentModal.show()"
        >
          Encounter Runner
        </main-btn>
      </v-row>
    </v-container>

    <main-footer @log="ccLog($event)" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MainBtn from '../main_menu/_components/MainBtn.vue'
import GMLog from './components/GMLog.vue'
import MainFooter from '../main_menu/_components/Footer.vue'

export default Vue.extend({
  name: 'landing-page',
  components: {
    MainBtn,
    GMLog,
    MainFooter,
  },
  methods: {
    ccLog(btn: string) {
      switch (btn) {
        case 'npc':
          this.$refs['log'].print(
            'un-db --about',
            'Create and manage NPCs for use in combat encounters'
          )
          break
        case 'encounter':
          this.$refs['log'].print(
            'un-db locint --help',
            'Create and manage combat encounters for use in the Encounter Runner'
          )
          break
        case 'runner':
          this.$refs['log'].print(
            'man galsim-link',
            'Create, manage, and run combat encounters with NPCs and Pilots'
          )
          break
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
