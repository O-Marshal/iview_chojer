<style scoped lang="less">
    @import "../../styles/unit/line_header.less";
</style>
<template>
    <div class="header" :style="style">
        <span>{{label}}</span>
    </div>
</template>
<script>
    export default {
        props:{
            'label': String,
            'styles': Object
        },
        data () {
            return {
                style: this.styles
            };
        }
    };
</script>