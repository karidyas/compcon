<template>
  <div>
    <v-row dense>
      <v-col>
        <span class="heading h3">Features</span>
      </v-col>
      <v-col cols="auto">
        <v-menu v-model="resetMenu" offset-y offset-x top left>
          <template v-slot:activator="{ on }">
            <v-btn small text color="error" class="fadeSelect" v-on="on">Reset Features</v-btn>
          </template>
          <cc-confirmation
            content="This will reset all NPC features to the base features derived from class and template selections."
            @confirm="removeMenu = false"
          />
        </v-menu>
      </v-col>
    </v-row>
    {{ allSelected }}
    <v-row dense>
      <v-col>
        <v-btn small outlined :color="allSelected ? 'accent' : ''" @click="selectAllTypes()">
          All ({{ item.Features.length }})
        </v-btn>
        <v-btn-toggle v-model="featureTypes" dense multiple active-class="accent--text">
          <v-btn small value="Weapon">Weapons ({{ weapons.length }})</v-btn>
          <v-btn small value="System">Systems ({{ systems.length }})</v-btn>
          <v-btn small value="Reaction">Reactions ({{ reactions.length }})</v-btn>
          <v-btn small value="custom">
            Active Traits (#)
          </v-btn>
          <v-btn small value="custom">
            Passive Traits (#)
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        class features:
        {{ classFeatures }}
        <br />
        <div v-for="item in featuresByTemplate" :key="`featureSet_${item.template}`">
          <div>{{ item.template }}</div>
          <div>{{ item.features }}</div>
        </div>
        <br />
        other features:
        {{ otherFeatures }}
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'npc-feature-block',
  props: { item: { type: Object, required: true } },
  data: () => ({
    resetMenu: false,
    featureTypes: ['Weapon', 'System', 'Reaction'],
  }),
  computed: {
    weapons() {
      return this.item.Features.filter(x => x.FeatureType === 'Weapon')
    },
    systems() {
      return this.item.Features.filter(x => x.FeatureType === 'System')
    },
    reactions() {
      return this.item.Features.filter(x => x.FeatureType === 'Reaction')
    },
    activeTraits() {
      return this.item.Features.filter(x => x.FeatureType === '')
    },
    passiveTraits() {
      return this.item.Features.filter(x => x.FeatureType === '')
    },
    allSelected() {
      return (
        this.featureTypes.includes('Weapon') &&
        this.featureTypes.includes('System') &&
        this.featureTypes.includes('Reaction')
      )
    },
    selectedFeatures() {
      return this.item.Features.filter(x => this.featureTypes.includes(x.FeatureType))
    },
    classFeatures() {
      return this.selectedFeatures.filter(
        x => x.OriginClass && x.OriginClass.toLowerCase() === this.item.Class.Name.toLowerCase()
      )
    },
    featuresByTemplate() {
      return this.item.Templates.map(template => ({
        template: template.Name,
        features: this.selectedFeatures.filter(
          x =>
            x.OriginClass && x.OriginClass.toLowerCase() === this.item.Template.Name.toLowerCase()
        ),
      }))
    },
    otherFeatures() {
      return this.selectedFeatures.filter(
        x =>
          !this.classFeatures.some(y => y.id === x.id) &&
          !this.templateFeatures.some(z => z.id === x.id)
      )
    },
  },
  methods: {
    selectAllTypes() {
      if (this.allSelected) this.$set(this, 'featureTypes', [])
      else this.$set(this, 'featureTypes', ['Weapon', 'System', 'Reaction'])
    },
  },
})
</script>
