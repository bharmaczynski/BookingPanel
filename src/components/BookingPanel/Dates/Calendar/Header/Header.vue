<template>
  <div class="header">
    <div
        class="header__arrow header__arrow--previous"
        @click="$emit('previousArrowClicked')"
    >
      <ArrowLeft />
    </div>
    <span class="header__label">{{ headerLabel }}</span>
    <div
        class="header__arrow header__arrow--next"
        @click="$emit('nextArrowClicked')"
    >
      <ArrowRight />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ArrowLeft from '@/assets/icons/left.svg';
import ArrowRight from '@/assets/icons/right.svg';

@Component({
  components: {
    ArrowLeft,
    ArrowRight,
  }
})
export default class Header extends Vue {
  @Prop({ required: true})
  headerLabel!: string;
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 60px;
  background: $downy;
  font-size: 18px;

  &__label {
    color: #fff;
  }

  &__arrow {
    width: 26px;
    height: 26px;
    padding: 5px;
    cursor: pointer;

    svg {
      width: auto;
      height: 100%;

      path {
        transition: fill 0.2s ease;
      }
    }

    &:hover {
      svg {
        path {
          fill: #fff;
        }
      }
    }
  }
}

</style>
