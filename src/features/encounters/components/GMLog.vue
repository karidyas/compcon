<template>
  <div id="output-container">
    <v-row no-gutters>
      <v-col cols="auto" class="mr-2">
        <div class="sidebar" />
        <div>
          <img src="../../../assets/ui/sb_l.png" />
        </div>
      </v-col>
      <v-col>
        <p
          id="completed"
          ref="completed"
          class="flavor-text subtle--text text--darken-1 py-0 my-0"
        ></p>
        <p id="output" ref="output" class="flavor-text subtle--text text--darken-1 py-0 my-0">
          <br />
          <br />
          <br />
        </p>
      </v-col>
      <v-col cols="auto" class="ml-2">
        <div class="sidebar" />
        <div>
          <img class="ml-n2" src="../../../assets/ui/sb_r.png" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TypeIt from 'typeit'
import { encryption } from '@/io/Generators'

const log = typer => {
  typer
    .type('<br>')
    .type('Connecting to un.int.service...')
    .break()
    .type(`Establishing encrypted link (${encryption()})`)
    .pause(200)
    .type('. ')
    .pause(200)
    .type('. ')
    .pause(200)
    .type('. ')
    .pause(300)
    .type('done')
    .break()
    .type(`Connection established`)
    .break()
    .type(`----------`)
    .break()
    .type(
      `Welcome to the Union Naval Omninet Intelligence Service (NODE@un_omni-16455.himalaya.annapurna.node:3)`
    )
    .break()
    .type(`UNINT-ONIS non-SSYNC OS v.32.15.5 RELEASE C`)
    .break()
    .type(` `)
    .break()
    .type(`Documentation: omni.un.int.service/docs`)
    .break()
    .type(`Support: support@omni.un.int.service`)
    .break()
    .type(`Support (TIGHTBEAM): 42:1992.18, 18:5847.09, 77:0056.54//ENC(${encryption()})`)
    .break()
    .type(` `)
    .break()
    .type(
      `ALL COMMUNICATION OVER THIS SERVICE IS MONITORED BY UN-INT NHP STAFF. ANY UNAUTHORIZED ACCESS OR`
    )
    .break()
    .type(`UNLAWFUL USE OF THIS SERVICE IS PUNISHABLE UNDER DoJ/HR AR 192.A-G`)
    .break()
    .type(
      '>//[<span class="accent--text">COMP/CON</span>: <span class="stark-text--text">Welcome, Administrator. Input Command.</span>]'
    )
    .go()
}

export default Vue.extend({
  name: 'cc-log',
  data: () => ({
    typer: {},
    text: [],
    lock: false,
  }),
  async mounted() {
    this.lock = true
    await Vue.nextTick()
    this.typer = new TypeIt(this.$refs.output, {
      speed: 2,
      nextStringDelay: 5,
      lifeLike: false,
      cursor: false,
      startDelete: false,
      beforeString: () => {
        this.$refs.output?.scrollIntoView({ block: 'end' })
      },
      afterString: () => {
        this.$refs.output?.scrollIntoView({ block: 'end' })
      },
      afterComplete: () => {
        this.lock = false
      },
    })
    log(this.typer)
  },
  methods: {
    print(user: string, response: string) {
      if (this.lock) return
      this.lock = true

      this.typer.destroy()

      //collect written strings so TypeIt doesn't erase them
      if (this.$refs.completed.innerHTML) this.$refs.completed.innerHTML += '<br>'
      this.$refs.completed.innerHTML += this.$refs.output.innerHTML
      this.$refs.output.innerHTML = ''

      this.typer = new TypeIt(this.$refs.output, {
        speed: 32,
        lifeLike: true,
        nextStringDelay: 7,
        cursor: false,
        beforeString: () => {
          this.$refs.output?.scrollIntoView({ block: 'end' })
        },
        afterString: () => {
          this.$refs.output?.scrollIntoView({ block: 'end' })
        },
        afterComplete: () => {
          this.lock = false
        },
      })
        .type(`$ `)
        .type(`<span class="stark-text--text">${user}</span>↵`)
        .pause(100)
        .options({ speed: 3, lifeLike: false })
        .break()
        .type('>')
        .type(
          `//[<span class="accent--text">COMP/CON</span>: <span class="stark--text">${response}</span>]`
        )
        .type(' ')
        .go()
    },
  },
})
</script>

<style scoped>
#output-container {
  position: absolute;
  height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
  width: calc(100vw - 665px);
  top: 0;
  right: 0;
  margin-right: 8px;
  z-index: 1;
}

.sidebar {
  align-self: stretch;
  display: inline-flex;
  height: inherit;
  min-height: 95%;
  max-height: 95%;
  max-width: 16px;
  width: 16px;
  background: url(../../../assets/ui/scale_1.png);
  vertical-align: text-bottom;
}
</style>
