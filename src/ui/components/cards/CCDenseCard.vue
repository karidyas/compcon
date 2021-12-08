<template>
  <v-card tile outlined>
    <v-toolbar dense :color="item.Color" flat height="30px" class="white--text">
      <span class="heading">
        <cc-tooltip inline :content="item.FeatureType">
          <v-icon left large dark>{{ item.Icon }}</v-icon>
        </cc-tooltip>
        {{ item.Name }}
      </span>
      <v-spacer />

      <span v-if="item.LcpName" class="flavor-text white--text">{{ item.LcpName }}</span>
    </v-toolbar>
    <cc-item-card :item="item" dense />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'cc-item-dense-card' })
export default class CCItemCard extends Vue {
  @Prop({ type: Object, required: true })
  readonly item

  @Prop({ type: Boolean })
  readonly dense
}
</script>
