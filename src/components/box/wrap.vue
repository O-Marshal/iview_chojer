<style scoped>
    .box-wrap {
        border: 1px solid #eee;
        border-radius: 6px;
        position: relative;
        transition: all 1s ease-in-out;
        min-height: 50px;
        padding-top: 20px;
        margin-bottom: 20px;
    }
</style>
<template>
    <div class="box-wrap">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            };
        }
    };
</script>