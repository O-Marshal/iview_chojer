<template>
    <div>
        <i-button type="primary" size="small" @click.stop="showRoleForm()">编辑</i-button>
        <i-button type="error" size="small" @click.stop="showPermissionForm()">权限</i-button>
        <RoleEditor ref="editorForm" :row="row" :index="index"></RoleEditor>
        <RolePermission ref="rolePermisionForm"></RolePermission>
    </div>
</template>
<script>
    import RoleEditor from './role_editor.vue';
    import RolePermission from './role_permission.vue';

    export default {
        name: 'RoleTableRender',
        props: {
            row: Object,
            index: Number
        },
        components: { RoleEditor, RolePermission },
        methods: {
            showPermissionForm () {
                this.$refs['rolePermisionForm'].show(this.row.id);
            },
            showRoleForm () {
                this.$refs['editorForm'].show();
            }
        }
    };
</script>