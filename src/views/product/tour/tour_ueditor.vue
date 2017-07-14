<style scoped>

</style>
<template>
    <SynModal v-model="value" width="800" :title="title" :loading="loading" @on-confirm="confirm">
        <div>
            <UE :height="ueHeight" v-model="innerHtml" ref="ueditor"></UE>
        </div>
    </SynModal>
</template>
<script>

    import SynModal from '../../../components/modal/syn.vue';
    import UE from '../../../components/editor/ue.vue'

    export default {
        data () {
            return {
                value: false,
                loading: false,
                id: 0,
                key: '',
                innerHtml: '',
                ueHeight: Math.max(window.innerHeight - 240, 360),
                title: '线路编辑',
                actions: {
                    specially: '线路特色',
                    attention: '须知事项',
                    expense: '费用说明'
                }
            };
        },
        components: { SynModal, UE },
        methods: {
            show (id, key) {
                this.value = true;
                this.key = key;
                this.id = id;
                this.title = this.actions[key];
                this.innerHtml = '';
                this.$refs.ueditor.refreshContent();
                this.$store.dispatch('product_tour_show_with_key', {id, key}).then(function (result) {
                    if (result.status == true && result.data) {
                        this.innerHtml = result.data;
                        this.$refs.ueditor.refreshContent();
                    }
                }.bind(this));
            },
            confirm () {
                this.loading = true;
                this.$store.dispatch('product_tour_update', {
                    id: this.id,
                    action: 'keyValue',
                    key: this.key,
                    value: this.innerHtml
                }).then(function (result) {
                    this.loading = false;
                    if (result == true) this.value = false;
                }.bind(this));
            }
        }

    };
</script>