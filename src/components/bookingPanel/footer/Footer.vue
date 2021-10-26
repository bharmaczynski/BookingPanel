<template>
    <div class="footer">
        <div class="footer__button">
            <button @click="$emit('buttonClicked')">Book</button>
        </div>
        <div class="footer__text">
            <p class="font-size-s">
                Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod
            </p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.footer {
    width: 100%;
    display: flex;
    flex-direction: column;

    &__button {
        margin: 30px 0 20px;
        padding-bottom: 30px;
        border-bottom: 1px solid $alto;

        button {
            width: 100%;
            border: 0;
            padding: 10px;
            background: $rose;
            color: #fff;
            border-radius: 4px;
            transition: background 0.2s ease;

            &:hover {
                background: $downy;
            }
        }
    }

    &__text {
        padding-left: 30px;
        margin-bottom: 10px;
        text-align: right;
    }
}
</style>
