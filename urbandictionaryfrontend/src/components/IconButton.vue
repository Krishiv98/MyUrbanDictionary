<template>
  <b-button :variant="variant" @click="$emit('click')">
    <b-icon :icon="icon" :animation="animation" />
    <slot></slot>
  </b-button>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class IconButton extends Vue {
  @Prop() readonly variant!:string;

  @Prop({ default: 'app' }) readonly icon!:string;

  @Prop({ default: 'cylon-vertical' }) readonly animationStyle!:string;

  @Prop() readonly animate!:boolean;

  get animation():string {
    return this.animate ? this.animationStyle : '';
  }
}
</script>
