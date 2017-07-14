<style lang="less">
    .tour-date-wrap .ivu-picker-panel-body {
        float: none !important;
    }
</style>
<template>
    <SynModal v-model="value" width="700" title="发布团期计划">
        <Row style="padding: 40px 30px">
            <i-col span="10">
                <div class="tour-date-wrap">
                    <DatePane :disabled-date="disabledDate"></DatePane>
                    <p style="text-align: center; margin-top: 10px">已选 <span>2</span> 天</p>
                </div>
            </i-col>
            <i-col offset="1" span="13">
                <div class="tour-content-wrap">
                    <Form>
                        <Row :gutter="20">
                            <i-col :span="24">
                                <Form-item label="库存">
                                    <i-input/>
                                </Form-item>
                            </i-col>
                            <i-col :span="12">
                                <Form-item label="成人报价">
                                    <i-input/>
                                </Form-item>
                            </i-col>
                            <i-col :span="12">
                                <Form-item label="儿童报价">
                                    <i-input/>
                                </Form-item>
                            </i-col>
                            <i-col :span="12">
                                <Form-item label="单房差（不计库存）">
                                    <i-input/>
                                </Form-item>
                            </i-col>
                        </Row>
                    </Form>
                </div>
            </i-col>
        </Row>
    </SynModal>
</template>
<script>

    import SynModal from '../../../components/modal/syn.vue';
    import DatePane from '../../../components/date/tour.vue';
    import LineHeader from '../../../components/unit/line_header.vue';

    export default {
        props: {
            row: Object,
            index: Number
        },
        components: { SynModal, DatePane, LineHeader },
        data () {
            return {
                value: false
            };
        },
        methods: {
            disabledDate (time) {
                const disabled = ['2017-4-5', '2017-4-8', '2017-4-10', '2017-4-21', '2017-5-2'].map(t => (new Date(t)).getTime());
                return disabled.indexOf(time.getTime()) >= 0;
            },
            show (index) {
                this.value = true;
            }
        }
    };
</script>