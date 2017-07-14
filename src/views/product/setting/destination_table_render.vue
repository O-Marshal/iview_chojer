<template>
    <div>
        <i-button type="primary" size="small" @click.stop="showUserForm">编辑</i-button>
        <DestinationEditor ref="destinationEditor" :data="row"></DestinationEditor>
    </div>
</template>
<script>

    import DestinationEditor from './destination_editor.vue';

    export default {
        props: {
            row: Object,
            index: Number
        },
        components: { DestinationEditor },
        methods: {
            showUserForm () {
                this.$refs['destinationEditor'].show();
            }
        }
    };
</script>