<style>
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .vertical-center-modal .ivu-modal{
        top: 0;
    }
</style>
<template>
    <div class="modal-syn-wrap">
        <Modal v-model="show" :title="title" :width="width" :class-name="center ? 'vertical-center-modal' : ''">
            <div style="padding-top: 10px; padding-right: 10px">
                <slot></slot>
            </div>
            <div slot="footer">
                <slot name="footer">
                    <Button @click="cancel">取消</Button>
                    <Button type="primary" :loading="show_loading" @click="confirm">确认</Button>
                </slot>
            </div>
        </Modal>
    </div>
</template>
<script>

    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '对话'
            },
            width: {
                type: [Number, String]
            },
            center: {
                type: Boolean,
                default: true
            },
            loading: {
                type: Boolean,
                default: false
            },
        },
        data () {
            return {
                show: false,
                show_loading: this.loading
            };
        },
        methods: {
            cancel () {
                this.show = false;
            },
            confirm () {
                this.$emit('on-confirm');
            }
        },
        watch: {
            value (val) {
                this.show = val
            },
            show (val) {
                this.$emit('input', val)
            },
            loading (val) {
                this.show_loading = val;
            }
        }
    };
</script>