<template>
  <div>
    <v-row dense>
      <editable-attribute
        attr="HULL"
        :val="item.Stats.Hull"
        :editable="item.IsCustomTier"
        @set="item.Stats.Hull = $event"
      />
      <editable-attribute
        attr="AGI"
        :val="item.Stats.Agility"
        :editable="item.IsCustomTier"
        @set="item.Stats.Agility = $event"
      />
      <editable-attribute
        attr="SYS"
        :val="item.Stats.Systems"
        :editable="item.IsCustomTier"
        @set="item.Stats.Systems = $event"
      />
      <editable-attribute
        attr="ENG"
        :val="item.Stats.Engineering"
        :editable="item.IsCustomTier"
        @set="item.Stats.Engineering = $event"
      />
    </v-row>
    <v-row dense>
      <editable-attribute
        attr="STRUCTURE"
        :val="item.Stats.Structure"
        :editable="item.IsCustomTier"
        @set="item.Stats.Structure = $event"
      />
      <editable-attribute
        attr="ARMOR"
        :val="item.Stats.Armor"
        :editable="item.IsCustomTier"
        @set="item.Stats.Armor = $event"
      />
      <editable-attribute
        attr="HP"
        :val="item.Stats.HP"
        :editable="item.IsCustomTier"
        @set="item.Stats.HP = $event"
      />
      <editable-attribute
        attr="REACTOR"
        :val="item.Stats.Stress"
        :editable="item.IsCustomTier"
        @set="item.Stats.Stress = $event"
      />
      <editable-attribute
        v-if="!item.IsBiological"
        attr="HEAT CAPACITY"
        :val="item.Stats.HeatCapacity"
        :editable="item.IsCustomTier"
        @set="item.Stats.HeatCapacity = $event"
      />
    </v-row>
    <v-row dense>
      <editable-attribute
        attr="SPEED"
        :val="item.Stats.Speed"
        :editable="item.IsCustomTier"
        @set="item.Stats.Speed = $event"
      />
      <editable-attribute
        attr="SAVE"
        :val="item.Stats.Save"
        :editable="item.IsCustomTier"
        @set="item.Stats.Save = $event"
      />
      <editable-attribute
        attr="EVASION"
        :val="item.Stats.Evade"
        :editable="item.IsCustomTier"
        @set="item.Stats.Evade = $event"
      />
      <editable-attribute
        attr="E-DEFENSE"
        :val="item.Stats.EDefense"
        :editable="item.IsCustomTier"
        @set="item.Stats.EDefense = $event"
      />
      <editable-attribute
        attr="SENSORS"
        :val="item.Stats.Sensor"
        :editable="item.IsCustomTier"
        @set="item.Stats.Sensor = $event"
      />
    </v-row>
    <v-row no-gutters class="mt-2">
      <editable-attribute
        attr="ACTIVATIONS PER ROUND"
        :val="item.Stats.Activations"
        :editable="item.IsCustomTier"
        @set="item.Stats.Activations = $event"
      />
      <size-attribute :stats="item.Stats" :editable="item.IsCustomTier" selectable />
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import EditableAttribute from './_subcomponents/EditableAttribute.vue'
import SizeAttribute from './_subcomponents/SizeAttribute.vue'

export default Vue.extend({
  name: 'npc-stat-editor',
  components: { EditableAttribute, SizeAttribute },
  props: {
    item: { type: Object, required: true },
  },
})
</script>
