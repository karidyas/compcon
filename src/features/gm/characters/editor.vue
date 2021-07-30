<template>
  <editor-base :item="character" :new="id === 'new'" @exit="$router.push('/gm/characters')">
    <v-row dense align="center">
      <v-col cols="auto">
        <v-btn icon color="secondary" class="fadeSelect" @click="randomName()">
          <v-icon>mdi-dice-multiple</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-text-field v-model="character.Name" label="Name" />
      </v-col>
      <v-col cols="auto" class="ml-4">
        <v-btn icon color="secondary" class="fadeSelect" @click="randomAlias()">
          <v-icon>mdi-dice-multiple</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="character.Alias"
          label="Alias"
          hint="Callsign, nickname, or other alias"
        />
      </v-col>
      <v-col cols="2" class="mx-4">
        <v-combobox
          v-model="character.Pronouns"
          :items="['He/Him', 'She/Her', 'They/Them']"
          label="Pronouns"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="character.Title"
          label="Title"
          hint="Job title, rank, or position"
          dense
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="character.Description"
          label="Description"
          hint="A brief description of this character"
          outlined
          auto-grow
          rows="3"
        />
      </v-col>
    </v-row>
    <v-row slot="print" dense align="center">
      <v-col v-if="character.Name">
        <div class="overline">NAME</div>
        <div class="heading h3">
          {{ character.Name }}
          <i
            v-if="character.Pronouns"
            class="caption font-weight-thin"
            v-html-safe="character.Pronouns"
          />
        </div>
      </v-col>
      <v-col v-if="character.Alias" cols="3">
        <div class="overline">ALIAS</div>
        <div class="heading h3" v-html-safe="character.Alias" />
      </v-col>
      <v-col cols="2" class="mx-4 mt-2"></v-col>
      <v-col v-if="character.Title" cols="12">
        <div class="overline">TITLE</div>
        <div class="heading h3" v-html-safe="character.Title" />
      </v-col>
      <v-col v-if="character.Description" cols="12">
        <div class="overline">Description</div>
        <div class="body-text" v-html-safe="character.Description" />
      </v-col>
    </v-row>
  </editor-base>
</template>

<script lang="ts">
import { Character } from '@/classes/campaign/Character'
import { name, callsign } from '@/io/Generators'
import Vue from 'vue'
import EditorBase from '../_components/EditorBase.vue'

export default Vue.extend({
  name: 'character-editor',
  components: { EditorBase },
  props: {
    id: { type: String, required: true },
  },
  data: () => ({
    character: null,
  }),
  created() {
    this.mountCharacter()
  },
  watch: {
    id() {
      this.mountCharacter()
    },
  },
  methods: {
    randomAlias() {
      this.character.Alias = callsign()
    },
    async randomName() {
      this.character.Name = await name()
    },
    mountCharacter() {
      if (this.id === 'new') this.character = new Character()
      else
        this.character = this.$store.getters['character/getCharacters'].find(x => x.ID === this.id)
    },
  },
})
</script>
