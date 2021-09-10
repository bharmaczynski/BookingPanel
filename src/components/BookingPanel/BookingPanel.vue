<template>
  <div class="booking-panel">
    <div class="booking-panel__content-wrapper">
      <div class="booking-panel__header">
        <span class="booking-panel__price text--bold font-size-l">
          {{ price }} zł
        </span>
        <div class="booking-panel__rates">
          <div class="booking-panel__stars">*****</div>
          <div class="booking-panel__number-of-rates text--bold">
            {{ numberOfRates }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BookingPanel extends Vue {
  @Prop({ required: true })
  price!: number;

  @Prop({ default: 0 })
  numberOfRates!: number;
}
</script>
<style lang="scss" scoped>
.booking-panel {
  width: 300px;
  padding: 20px 25px;
  margin: 0 auto;
  border: 1px solid $alto;

  &__content-wrapper {
    display: flex;
    flex-direction: column;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 20px;
    border-bottom: 1px solid $alto;
  }

  &__rates {
    display: flex;
    margin-top: 10px;
  }

  &__number-of-rates {
    margin-left: 10px;
  }
}
</style>
