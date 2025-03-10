<template>
  <cc-solo-dialog
    ref="dialog"
    icon="mdi-account-arrow-right"
    large
    no-confirm
    title="Export Pilot Data"
  >
    <v-card-text>
      <v-row>
        <v-col>
          <v-btn large block tile outlined color="accent" @click="exportPilot()">
            Export Pilot Data File
          </v-btn>
        </v-col>
        <v-col cols="auto" class="ml-n1">
          <cc-tooltip
            simple
            inline
            :content="`This will create a pilot data file on your system that can then be imported into another COMP/CON user's Pilot Roster via the \'Add New Pilot\' > \'Import from File\' option. If this pilot has a cloud save record, that connection will be preserved. `"
          >
            <v-icon class="mt-2 ml-n3">mdi-information-outline</v-icon>
          </cc-tooltip>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn large block tile outlined color="accent" @click="copyPilot()">
            Copy Pilot Data to Clipboard (Roll20 Import)
          </v-btn>
        </v-col>
        <v-col cols="auto" class="ml-n1">
          <cc-tooltip
            simple
            inline
            content="This will copy your pilot's data into your computer's clipboard, suitable for importing into the LANCER Character Sheet on Roll20"
          >
            <v-icon class="mt-2 ml-n3">mdi-information-outline</v-icon>
          </cc-tooltip>
        </v-col>
      </v-row>
    </v-card-text>
  </cc-solo-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveFile } from '@/io/Dialog'
import { Pilot } from '@/class'

export default Vue.extend({
  name: 'export-dialog',
  props: {
    pilot: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    syncing: false,
    copyConfirm: false,
  }),
  methods: {
    show() {
      this.$refs.dialog.show()
    },
    hide() {
      this.$refs.dialog.hide()
    },
    exportPilot() {
      this.pilot.BrewController.SetBrewData()
      saveFile(
        this.pilot.Callsign.toUpperCase().replace(/\W/g, '') + '.json',
        JSON.stringify(Pilot.Serialize(this.pilot)),
        'Save Pilot'
      )
      this.hide()
    },
    copyPilot() {
      this.pilot.BrewController.SetBrewData()
      navigator.clipboard.writeText(JSON.stringify(Pilot.Serialize(this.pilot)))
      Vue.prototype.$notify('Roll20 data copied to clipboard')
      this.hide()
    },
    async copyCode() {
      this.copyConfirm = true
      navigator.clipboard.writeText(this.pilot.ShareCode).then(
        function () {
          Vue.prototype.$notify('Cloud ID copied to clipboard.', 'confirmation')
        },
        function () {
          Vue.prototype.$notifyError('Unable to copy Cloud ID')
        }
      )
      setTimeout(() => {
        this.copyConfirm = false
      }, 1200)
    },
  },
})
</script>
