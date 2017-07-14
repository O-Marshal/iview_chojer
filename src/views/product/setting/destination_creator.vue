<style scoped>
</style>
<template>
    <SynModal v-model="value" title="新建标签" width="550" :loading="loading" @on-confirm="confirm">
        <Form ref="destFrom" style="padding: 0 20px">
            <Row>
                <i-col span="12">
                    <CoverImage v-model="cover" :size="50" style="margin-top: 30px;"></CoverImage>
                </i-col>
                <i-col span="12">
                    <Form-item label="目的地" style="margin-bottom: 10px">
                        <i-input v-model="name" type="text"></i-input>
                    </Form-item>
                    <Form-item label="描述">
                        <i-input v-model="description" type="textarea" :rows="3"></i-input>
                    </Form-item>
                </i-col>
            </Row>
        </Form>
    </SynModal>
</template>
<script>

    import CoverImage from '../../../components/upload/cover.vue';
    import SynModal from '../../../components/modal/syn.vue'
    import { deepCopy } from 'iview/src/utils/assist';

    export default {
        props: {
            rows: Array
        },
        data () {
            return {
                value: false,
                loading: false,

                cover: '',
                name: '',
                description: ''
            }
        },
        components: { SynModal, CoverImage },
        methods: {
            show () {
                this.name = '';
                this.cover = '';
                this.description = '';
                this.$nextTick(function () {
                    this.value = true;
                });
            },
            confirm () {
                this.$store.dispatch('product_setting_destination_store', {
                    'tag_name': this.name,
                    'cover_image': this.cover,
                    'description': this.description
                }).then(function (result) {
                    this.loading = false;
                    if (result == true) this.value = false;
                }.bind(this));
            }
        }
    };
</script>