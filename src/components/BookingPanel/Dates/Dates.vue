<template>
  <div class="dates-input">
    <span class="dates-input__title text--bold">Dates</span>
    <div class="dates-input__dates-holder">
      <div class="dates-input__input-holder">
        <input
          class="dates-input__input font-size-base"
          :value="date.checkIn"
          placeholder="Check in"
          @input="onInputCheckIn"
        />
      </div>
      <div class="dates-input__input-holder font-size-l">
        <input
          class="dates-input__input font-size-base"
          :value="date.checkOut"
          placeholder="Check out"
          @input="onInputCheckOut"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Dates extends Vue {
  @Prop({ required: true })
  date!: {
    checkIn: string;
    checkOut: string;
  };

  onInputCheckIn(event: { target: HTMLInputElement }): void {
    this.$emit('dateChanged', {
      checkIn: event.target.value,
      checkOut: this.date.checkOut,
    });
  }

  onInputCheckOut(event: { target: HTMLInputElement }): void {
    this.$emit('dateChanged', {
      checkIn: this.date.checkIn,
      checkOut: event.target.value,
    });
  }
}
</script>
<style lang="scss" scoped>
.dates-input {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  align-items: flex-start;

  &__dates-holder {
    display: flex;
    width: 100%;
    border: 1px solid $alto;
    margin-top: 10px;
  }

  &__input {
    border: 0;
    padding: 10px;
    width: 100%;
  }

  &__input-holder {
    width: 50%;
    text-align: center;
  }
}
</style>
