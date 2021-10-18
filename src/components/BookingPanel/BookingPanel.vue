<template>
    <div class="booking-panel">
        <div class="booking-panel__content-wrapper">
            <Header
                class="booking-panel__header"
                :price="price"
                :numberOfRates="numberOfRates"
                :rating="rating"
            />
            <Dates
                :date="pickedDate"
                :unavailableDates="unavailableDates"
                @dateChanged="onDateChanged"
            />
            <Footer @buttonClicked="handleButtonClick" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Dates from '@/components/BookingPanel/Dates/Dates.vue';
import Rating from '@/components/BookingPanel/Rating/Rating.vue';
import Header from '@/components/BookingPanel/Header/Header.vue';
import Footer from '@/components/BookingPanel/Footer/Footer.vue';
import IDate from '@/ts/types/date.type.ts';

@Component({
    components: {
        Dates,
        Rating,
        Header,
        Footer,
    },
})
export default class BookingPanel extends Vue {
    @Prop({ required: true })
    price!: number;

    @Prop({ default: 0 })
    numberOfRates!: number;

    @Prop({ default: 0 })
    rating!: number;

    @Prop({ default: [] })
    unavailableDates!: string[];

    @Prop({ required: true })
    pickedDate!: IDate;

    onDateChanged(date: IDate): void {
        this.$emit('dateChanged', date);
    }

    handleButtonClick(): void {
        this.$emit('bookButtonClicked', this.pickedDate);
    }
}
</script>
<style lang="scss" scoped>
.booking-panel {
    width: 360px;
    padding: 20px 25px;
    margin: 0 auto;
    border: 1px solid $alto;
    border-radius: 2px;

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
}
</style>
