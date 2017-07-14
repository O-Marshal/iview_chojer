<style scoped>
    .trip-from-wrap {
        padding: 0 20px;
    }

    .trip-from-wrap .ivu-form-item {
        margin-bottom: 0;
    }
</style>
<template>
    <div class="trip-from-wrap">
        <Form>
            <Row :gutter="40">
                <i-col span="12">
                    <Form-item label="标题">
                        <i-input type="text" v-model="title" />
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="酒店住宿">
                        <i-input type="text" v-model="hotel" />
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="早餐">
                        <i-input type="text" v-model="breakfast" />
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="午餐">
                        <i-input type="text" v-model="lunch" />
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="晚餐">
                        <i-input type="text" v-model="dinner" />
                    </Form-item>
                </i-col>
                <i-col span="24">
                    <Form-item label="行程内容">
                        <UE :height="160" :toolbars="toolbars" v-model="detail"></UE>
                    </Form-item>
                </i-col>
            </Row>
        </Form>
    </div>

</template>
<script>
    import UE from '../../../components/editor/ue.vue'

    export default {
        props: {
            value: Object
        },
        data () {
            return {
                toolbars: [['fontsize', 'bold', 'v_picture']],
                cloneData: Object,
                title: '',
                breakfast: '',
                lunch: '',
                dinner: '',
                hotel: '',
                detail: ''
            }
        },
        components: { UE },
        methods: {
            initalData (val) {
                this.title = val.title;
                this.breakfast = val.breakfast;
                this.lunch = val.lunch;
                this.dinner = val.dinner;
                this.hotel = val.hotel;
                this.detail = val.detail ? val.detail : '';
                this.cloneData = val;
            }
        },
        mounted () {
            this.initalData(this.value);
        },
        watch: {
            title (val) {
                this.cloneData.title = val;
                this.$emit('input', this.cloneData);
            },
            breakfast (val) {
                this.cloneData.breakfast = val;
                this.$emit('input', this.cloneData);
            },
            lunch (val) {
                this.cloneData.lunch = val;
                this.$emit('input', this.cloneData);
            },
            dinner (val) {
                this.cloneData.dinner = val;
                this.$emit('input', this.cloneData);
            },
            hotel (val) {
                this.cloneData.hotel = val;
                this.$emit('input', this.cloneData);
            },
            detail (val) {
                this.cloneData.detail = val;
                this.$emit('input', this.cloneData);
            },
            value (val) {
                this.initalData(val);
            }
        }

    };
</script>