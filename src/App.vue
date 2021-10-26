<template>
    <div id="app">
        <BookingPanel
            :price="298"
            :number-of-rates="123"
            :rating="4.5"
            :unavailableDates="['21-11-2021', '22-11-2021', '15-11-2021']"
            :pickedDate="date"
            @dateChanged="onDateChanged"
            @bookButtonClicked="handleBookButtonClick"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookingPanel from '@/components/bookingPanel/BookingPanel.vue';
import IDate from '@/ts/types/date.type.ts';

@Component({
    components: {
        BookingPanel,
    },
})
export default class App extends Vue {
    private date: IDate = {
        checkIn: '',
        checkOut: '',
    };

    onDateChanged(date: IDate): void {
        this.date = date;
    }

    handleBookButtonClick(): void {
        this.date.checkIn && this.date.checkOut
            ? alert(`Selected dates: ${this.date.checkIn} - ${this.date.checkOut}`)
            : alert('Please select date');
    }
}
</script>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
    font-size: $font-size-base;
}
</style>
