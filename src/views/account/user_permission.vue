<template>
    <SynModal v-model="value" title="权限管理" width="800" @on-confirm="confirm" :loading="loading">
        <i-table border :columns="columns" :data="tableDatas"></i-table>
    </SynModal>
</template>
<script>
    import SynModal from '../../components/modal/syn.vue';
    import UserPermissionRender from './user_permission_render.vue';

    import { deepCopy } from 'iview/src/utils/assist';
    import { mapGetters } from 'vuex';

    export default {
        data () {
            return {
                value: false,
                loading: false,
                user_id: 0,
                columns: [
                    {
                        title: '模块',
                        key: 'name',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '权限列表',
                        key: 'sub',
                        align: 'center',
                        render: (h, obj) => h(UserPermissionRender, {
                            props: {
                                sub: obj.row.sub,
                                index: obj.index
                            }
                        })
                    }
                ]
            };
        },
        components: { SynModal },
        computed: {
            ...mapGetters({
                tableDatas: 'account_user_permissions'
            })
        },
        methods: {
            show (id) {
                this.user_id = id;
                this.$store.dispatch('account_user_permission_index', id);
                this.value = true;
            },
            confirm () {
                this.loading = true;
                this.$store.dispatch('account_user_permission_update', this.user_id).then(function (result) {
                    this.loading = false;
                    if (result === true) this.value = false;
                }.bind(this));
            }
        }
    };
</script>