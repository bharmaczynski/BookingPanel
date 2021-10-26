<template>
    <div class="rating">
        <div class="rating__stars">
            <StarTemplate />
            <div
                v-for="index in maxRating"
                :key="index"
                class="rating__star-icon"
                :class="[starClass(index)]"
            >
                <svg width="14" height="14" viewBox="0 0 14 14">
                    <use v-if="starClass(index) === 'half'" href="#star" fill="url(#half)" />
                    <use v-else href="#star" />
                </svg>
            </div>
        </div>
        <span class="rating__number-of-rates text--bold font-size-s">
            {{ numberOfRates }}
        </span>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import StarTemplate from '@/components/bookingPanel/rating/star/starTemplate.svg';

const MAX_RATING: number = 5;

enum STAR_CLASSES {
    Active = 'active',
    Inactive = 'inactive',
    Half = 'half',
}

@Component({
    components: {
        StarTemplate,
    },
})
export default class Rating extends Vue {
    maxRating: number = MAX_RATING;

    @Prop({ default: 0 })
    numberOfRates!: number;

    @Prop({ default: 0 })
    rating!: number;

    get roundHalfRating(): number {
        return Math.round(this.rating * 2) / 2;
    }

    starClass(index: number): string {
        let className = STAR_CLASSES.Active;

        if (index - 0.5 === this.roundHalfRating) className = STAR_CLASSES.Half;
        if (index - 0.5 > this.roundHalfRating) className = STAR_CLASSES.Inactive;

        return className;
    }
}
</script>
<style lang="scss" scoped>
.rating {
    display: flex;
    align-items: flex-start;
    margin-top: 5px;

    &__number-of-rates {
        margin-left: 10px;
        margin-top: 2px;
    }

    &__stars {
        display: flex;
        align-items: flex-start;
        height: 14px;
    }

    &__star-icon {
        &.active {
            fill: $oceanGreen;
        }
        &.inactive {
            fill: $sliverSand;
        }
    }
}
</style>
