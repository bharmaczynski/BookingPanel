<template>
  <input
      class="date-input font-size-base"
      :value="value"
      placeholder="Check in"
      @input="onInput"
  />
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class DateInput extends Vue {
  @Prop({ required: true })
  value!: string

  onInput(event: { target: HTMLInputElement }): void {
    this.$emit('input', event.target.value);
  }
}
</script>
<style lang="scss" scoped>
.date-input {
  background: transparent;
  border: 0;
  padding: 10px 15px;
  width: 100%;
  cursor: pointer;

  &:focus {
    border: 0;
    outline: 0;
  }
}
</style>
