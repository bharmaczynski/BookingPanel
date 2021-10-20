<template functional>
    <div class="weekdays">
        <div v-for="weekday in props.weekdays" :key="weekday" class="weekdays__weekday">
            <span class="weekdays__weekday-label font-size-s">{{ weekday }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Weekdays extends Vue {
    @Prop({ required: true })
    weekdays!: string[];
}
</script>
<style lang="scss" scoped>
.weekdays {
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    padding: 10px;

    &__weekday {
        width: 14%;
        text-align: center;
    }

    &__weekday-label {
        color: $gray;
    }
}
</style>
