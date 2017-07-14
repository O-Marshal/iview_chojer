<style scoped>

</style>
<template>
    <Layout>
        <AccountStore v-if="isStore"></AccountStore>
        <AccountUser v-else></AccountUser>
    </Layout>
</template>
<script>
    import Layout from '../../components/layout/console.vue';
    import AccountStore from './account_store.vue';
    import AccountUser from './account_user.vue';

    export default {
        data () {
            return {
                auth_info: {
                    id: 1,
                    org_id: 0
                }
            };
        },
        computed: {
            isStore () {
                return this.auth_info.id === this.auth_info.org_id;
            }
        },
        components: { Layout, AccountStore, AccountUser },
        created () {
            this.auth_info = this.$store.getters.auth_info;
        }
    };
</script>