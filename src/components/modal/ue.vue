<template>
    <div class="modal-syn-wrap">
        <Modal v-model="show" :title="title" :width="width" class-name="vertical-center-modal top-modal">
            <div style="padding-top: 10px; padding-right: 10px">
                <slot></slot>
            </div>
            <div slot="footer">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="confirm">确认</Button>
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
            }
        },
        data () {
            return {
                show: false,
            };
        },
        methods: {
            cancel () {
                this.show = false;
            },
            confirm () {
                this.$emit('on-confirm');
                this.cancel();
            }
        },
        watch: {
            value (val) {
                this.show = val
            },
            show (val) {
                this.$emit('input', val)
            }
        }
    };
</script>