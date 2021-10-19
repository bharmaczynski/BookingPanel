<template>
    <div class="header">
        <span class="header__price text--bold font-size-xxl"> {{ price }} zł </span>
        <Rating :numberOfRates="numberOfRates" :rating="rating" />
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Rating from '@/components/bookingPanel/rating/Rating.vue';

@Component({
    components: {
        Rating,
    },
})
export default class Header extends Vue {
    @Prop({ required: true })
    price!: number;

    @Prop({ default: 0 })
    numberOfRates!: number;

    @Prop({ default: 0 })
    rating!: number;
}
</script>
