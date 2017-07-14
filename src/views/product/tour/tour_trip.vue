<style>
    .ivu-tabs-nav-wrap .ivu-tabs-nav-scroll {
        overflow-x: scroll;
    }
</style>
<template>
    <SynModal v-model="value" width="600" :title="title" :loading="loading">
        <div v-if="days.length === 0" style="text-align: center; padding: 50px 0;">
            行程为空
        </div>
        <div v-else>
            <Tabs closable v-model="tabActive" ref="tabPane">
                <template v-for="(day,index) in days">
                    <Tab-pane :label="getNavLabel(index)" :name="getNavName(index)">
                        <TripForm v-model="days[index]"></TripForm>
                    </Tab-pane>
                </template>
            </Tabs>
        </div>
        <div slot="footer">
            <Button type="ghost" @click="addOneDay" :disabled="disabled">增加</Button>
            <Button type="error" @click="removeLastday":disabled="disabled">删除</Button>
            <Button type="primary" @click="confirm":disabled="disabled">保存</Button>
        </div>
    </SynModal>

</template>
<script>

    import SynModal from '../../../components/modal/syn.vue';
    import UE from '../../../components/editor/ue.vue';

    import TripForm from './tour_trip_form.vue';

    export default {
        props: {
            title: String
        },
        data () {
            return {
                value: false,
                loading: false,
                disabled: true,
                id: 0,
                key: '',
                tabActive: '_0',
                days: []
            };
        },
        components: { SynModal, TripForm },
        methods: {
            show (id) {
                this.value = true;
                this.id = id;
                this.days = [];
                this.$store.dispatch('product_tour_trip', id).then(function (result) {
                    if (result.status == true) {
                        this.days = result.data;
                        this.disabled = false;
                    }
                }.bind(this));
            },
            getNavLabel: i => '第' + (i + 1) + '天',
            getNavName: i => '_' + i,
            getIndexWithName () {
                return parseInt(this.tabActive.substr(1))
            },
            addOneDay () {
                this.days.push({
                    title: '',
                    breakfast: '',
                    lunch: '',
                    dinner: '',
                    hotel: '',
                    detail: ''
                });
            },
            removeLastday () {
                if (this.days.length === 0) {
                    return this.$Modal.warning({
                        content: '没有可删除的行程'
                    });
                }
                const index = this.days.length - 1;
                const confirm = '是否要删除【最后一天】的行程？';
                const self = this;
                return this.$Modal.confirm({
                    content: confirm,
                    onOk: () => {
                        self.$refs['tabPane'].handleRemove(index);
                        self.days.splice(index, 1)
                    }
                });
            },
            confirm () {
                this.loading = true;
                this.$store.dispatch('product_tour_update', {
                    id: this.id,
                    action: 'edit_trip',
                    days: this.days
                }).then(function (result) {
                    this.loading = false;
                    if (result == true) this.value = false;
                }.bind(this));
            }
        }

    };
</script>