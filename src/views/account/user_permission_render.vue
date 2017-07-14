<template>
    <div style="text-align: left">
        <template v-for="(item, i) in sub">
            <Checkbox :value="item.selected" @on-change="persmissionChange($event,i)">{{ item.name }}</Checkbox>
        </template>
    </div>
</template>
<script>
    import SynModal from '../../components/modal/syn.vue'
    import { deepCopy } from 'iview/src/utils/assist';
    import { mapGetters } from 'vuex';

    export default {
        props: {
            index: Number,
            sub: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            persmissionChange (val, i) {
                this.$store.commit('account_user_permission_change', {
                    row: this.index,
                    index: i,
                    selected: val
                });
            }
        }
    };
</script>