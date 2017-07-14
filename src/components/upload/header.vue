<template>
    <div class="upload-wrap" style="padding-top: 15px">
        <Upload
                :show-upload-list="false"
                :action="uploadAction"
                :data="uploadParams"
                name="avatar"
                accept="image/gif,image/jpeg,image/png"
                :format="['jpg','jpeg','png','gif']"
                :max-size="2048"
                type="select"
                :before-upload="beforeUpload"
                :on-success="success"
                :on-error="error"
                :on-format-error="formatError"
                :on-exceeded-size="exceededSize"
                style="display: block; width: 100px; margin: 0 auto; border: 1px dashed #ccc; border-radius: 5px; overflow: hidden">
            <div style="width: 100px; height: 100px; text-align: center">
                <Cspin v-if="loading"></Cspin>
                <img :src="preview" v-else-if="value">
                <div v-else style="padding-top: 15px"><Icon type="camera" size="60"></Icon></div>
            </div>
        </Upload>
        <p style="text-align: center; margin-top: 15px">用户头像</p>
    </div>
</template>
<script>

    import Urls from '../../config/urls';
    import Cspin from '../spin/circular.vue'

    export default {
        props: {
            value: {
                type: String,
                default: null
            }
        },
        data () {
            return {
                loading: false,
            }
        },
        components: { Cspin },
        computed: {
            uploadAction () {
                return Urls.API_URL + "/upload/avatar";
            },
            uploadParams () {
                return {
                    'auth-token': localStorage.getItem('auth_token')
                }
            },
            preview () {
                return this.value ? this.value + '/100x100' : '';
            }
        },
        methods: {
            beforeUpload () {
                this.loading = true;
            },
            success (response, file, fileList) {
                this.preview = response.preview;
                this.$emit('input', response.url);
                this.loading = false;
            },
            error (error, file, fileList) {
                this.$Message.error('头像上传失败,请稍后再试');
                this.loading = false;
            },
            formatError () {
                this.$Message.error('文件类型不支持,仅限jpg,jpeg.png,gif格式');
                this.loading = false;
            },
            exceededSize () {
                this.$Message.error('文件过大,最大只支持2M文件');
                this.loading = false;
            }
        }
    };
</script>