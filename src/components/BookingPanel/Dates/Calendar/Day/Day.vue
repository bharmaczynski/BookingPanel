<template>
    <div
        class="day"
        :class="{
            'day--inactive': day.outOfMonth,
            'day--today': day.isToday,
            'day--unavailable':
                setPastDay(day.value) || day.unavailable || day.temporaryUnavailable,
            'day--start': day.value === checkedDate.checkIn,
            'day--end': day.value === checkedDate.checkOut,
            'day--between': day.isBetween,
            'day--invalid': day.isInvalid,
        }"
        @click="handleDayClick(day.value)"
        @mouseenter="handleMouseEnter(day.value)"
    >
        <span class="day__text font-size-s">{{ day.number }}</span>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IDay from '@/ts/types/day.type';
import { isPastDay } from '@/modules/utils/helpers';
import IDate from '@/ts/types/date.type.ts';

@Component
export default class Day extends Vue {
    @Prop({ required: true })
    day!: IDay;

    @Prop({ default: { checkIn: '', checkOut: '' } })
    checkedDate!: IDate;

    handleDayClick(value: string): void {
        this.$emit('click', value);
    }

    handleMouseEnter(value: string): void {
        this.$emit('mouseEnter', value);
    }

    setPastDay(date: string): boolean {
        return isPastDay(date);
    }
}
</script>
<style lang="scss" scoped>
.day {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;

    &:hover {
        background: #cffcf8;
        color: $downy;

        &::before {
            right: 19px !important;
        }
    }

    &--inactive {
        color: #888;
    }

    &--today {
        color: $downy;
        border: 2px solid $downy;
    }

    &--unavailable {
        color: rgba(#333, 0.3);
        pointer-events: none;
    }

    &--between {
        color: $downy;
        background: #cffcf8;

        &::before {
            content: '';
            display: block;
            position: absolute;
            z-index: -1;
            top: -2px;
            right: 19px;
            bottom: -2px;
            left: -19px;
            background: #cffcf8;
        }
    }

    &--start,
    &--end {
        background: $downy;
        color: #fff;
    }

    &--invalid {
        color: #ca0b00;
        border: 2px solid red;
    }

    &__text {
        font-weight: 500;
    }
}
</style>
