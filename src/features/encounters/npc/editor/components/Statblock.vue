<template>
  <v-col cols="12">
    <slot />
    <v-row no-gutters class="mb-2">
      <editable-attribute
        attr="HULL"
        :val="item.Stats.Hull"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Hull = $event"
      />
      <editable-attribute
        attr="AGI"
        :val="item.Stats.Agility"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Agility = $event"
      />
      <editable-attribute
        attr="SYS"
        :val="item.Stats.Systems"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Systems = $event"
      />
      <editable-attribute
        attr="ENG"
        :val="item.Stats.Engineering"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Engineering = $event"
      />
    </v-row>
    <v-row no-gutters>
      <editable-attribute
        attr="STRUCTURE"
        :val="item.Stats.Structure"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Structure = $event"
      />
      <editable-attribute
        attr="ARMOR"
        :val="item.Stats.Armor"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Armor = $event"
      />
      <editable-attribute
        attr="HP"
        :val="item.Stats.HP"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.HP = $event"
      />
      <editable-attribute
        attr="REACTOR"
        :val="item.Stats.Stress"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Stress = $event"
      />
      <editable-attribute
        v-if="!item.IsBiological"
        attr="HEAT CAPACITY"
        :val="item.Stats.HeatCapacity"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.HeatCapacity = $event"
      />
    </v-row>
    <v-row no-gutters>
      <editable-attribute
        attr="SPEED"
        :val="item.Stats.Speed"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Speed = $event"
      />
      <editable-attribute
        attr="SAVE"
        :val="item.Stats.Save"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Save = $event"
      />
      <editable-attribute
        attr="EVASION"
        :val="item.Stats.Evade"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Evade = $event"
      />
      <editable-attribute
        attr="E-DEFENSE"
        :val="item.Stats.EDefense"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.EDefense = $event"
      />
      <editable-attribute
        attr="SENSORS"
        :val="item.Stats.Sensor"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Sensor = $event"
      />
    </v-row>
    <v-row no-gutters class="mt-2">
      <editable-attribute
        attr="ACTIVATIONS PER ROUND"
        :val="item.Stats.Activations"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        @set="item.Stats.Activations = $event"
      />
      <size-attribute
        :stats="item.Stats"
        :color="item.Class.Color"
        :editable="item.IsCustomTier"
        selectable
      />
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import EditableAttribute from '../../components/EditableAttribute.vue'
import SizeAttribute from '../../components/SizeAttribute.vue'

export default Vue.extend({
  name: 'npc-editor-statblock',
  components: { EditableAttribute, SizeAttribute },
  props: {
    item: { type: Object, required: true },
  },
})
</script>
