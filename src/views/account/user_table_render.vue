<template>
    <div>
        <i-button type="primary" size="small" @click.stop="showUserForm">编辑</i-button>
        <i-button type="error" size="small" @click.stop="showPermissionForm">权限</i-button>
        <UserEditor ref="userEditor" :row="row" :index="index"></UserEditor>
        <UserPermission ref="permissionForm"></UserPermission>
    </div>
</template>
<script>

    import UserEditor from './user_editor.vue';
    import UserPermission from './user_permission.vue';

    export default {
        name: 'UserTableRender',
        props: {
            row: Object,
            index: Number
        },
        components: { UserEditor, UserPermission },
        methods: {
            showPermissionForm () {
                this.$refs['permissionForm'].show(this.row.id);
            },
            showUserForm () {
                this.$refs['userEditor'].show();
            }
        }
    };
</script>