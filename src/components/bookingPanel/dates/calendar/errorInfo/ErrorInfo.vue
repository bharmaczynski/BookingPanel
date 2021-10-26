<template functional>
    <div class="error-info">
        <p>Select other days</p>
        <span>Selected date includes unavailable days</span>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ErrorInfo extends Vue {}
</script>
<style lang="scss" scoped>
.error-info {
    padding: 10px 10px 20px;
    color: $guardsman;

    p {
        text-transform: uppercase;
        margin-bottom: 5px;
    }
}
</style>
