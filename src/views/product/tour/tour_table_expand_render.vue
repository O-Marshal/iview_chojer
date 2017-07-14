<style scoped>
    .team-date-expand-wrap .ivu-btn {
        margin-right: 10px;
    }

    .team-date-expand-wrap .ivu-table-body .ivu-table-row td {
        padding: 0;
    }
    .team-date-expand-wrap .ivu-btn {
        margin-top: 10px;
    }
</style>
<template>
    <div class="team-date-expand-wrap">
        <Row>
            <i-col span="18">
                <div class="date-list">
                    <p>团期列表 <a style="float: right">全部团期></a></p>
                    <i-table style="margin: 15px 0" :columns="tableCloumns" :data="row.tour_dates"></i-table>
                </div>
            </i-col>
            <i-col span="6">
                <p style="text-align: center">累计收客</p>
                <h1 style="text-align: center; margin-top: 5px">-</h1>
            </i-col>
        </Row>
        <Dropdown @on-click="showForm">
            <Button type="primary">
                发布团期
                <Icon type="arrow-down-b"></Icon>
            </Button>
            <Dropdown-menu slot="list">
                <Dropdown-item name="dateCreator">普通模式</Dropdown-item>
                <Dropdown-item name="dateCreatorPro">专业模式</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
        <Button type="warning">上架管理</Button>
        <Button @click="showForm('uedtiorForm', 'specially')">特色推荐</Button>
        <Button @click="showForm('tripForm')">行程安排</Button>
        <Button @click="showForm('uedtiorForm', 'expense')">费用说明</Button>
        <Button @click="showForm('uedtiorForm', 'attention')">须知事项</Button>
        <Button>上架信息</Button>
        <Button>附件管理</Button>

        <DateCreator :index="index" :product="row" ref="dateCreator"></DateCreator>
        <DateCreatorPro :index="index" :product="row" ref="dateCreatorPro"></DateCreatorPro>
        <Ueditor ref="uedtiorForm"></Ueditor>
        <TourTrip title="行程安排" ref="tripForm"></TourTrip>
    </div>
</template>
<script>

    import DateCreator from '../date/date_creator.vue';
    import DateCreatorPro from '../date/date_creator_pro.vue';

    import Ueditor from './tour_ueditor.vue';

    import TourTrip from './tour_trip.vue';

    import TourDateSeat from '../date/date_seat.vue';
    import TourDateHandler from '../date/date_handler.vue';

    export default {
        props: {
            row: Object,
            index: Number
        },
        components: {DateCreator, DateCreatorPro, Ueditor, TourTrip},
        data () {
            return {
                self: this,
                tableCloumns: [
                    {
                        title: '发团日期',
                        key: 'date_str',
                        align: 'center'
                    },
                    {
                        title: '余位',
                        align: 'center',
                        render: (h, obj) => h(TourDateSeat, { props: obj })
                    },
                    {
                        title: '起售价',
                        key: 'floor_price',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, obj) => h(TourDateHandler, { props: {
                            product: this.row,
                            row: obj.row,
                            index: obj.index
                        } })
                    }
                ]
            };
        },
        methods: {
            showForm (formName, key) {
                this.$refs[formName].show(this.row.id, key);
            }
        }
    };
</script>