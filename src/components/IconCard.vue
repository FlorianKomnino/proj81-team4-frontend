<template>
    <div class="iconCard d-flex justify-content-center flex-wrap mx-3">
        <font-awesome-icon class="icon" :icon="faIconString" />
        <span>{{ iconArgument }}</span>
    </div>
</template>

<script>
export default {
    name: 'IconCard',
    props: {
        faIconString: String,
        iconArgument: String,
    }
}
</script>

<style lang="scss" scoped>
.iconCard {
    height: 4rem;
    width: 4rem;

    .icon {
        font-size: 2rem;
        margin: auto;
    }

    span {
        width: 100%;
        font-size: 0.5rem;
        text-align: center;
    }

}
</style>