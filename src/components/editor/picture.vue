<style scoped>
    .ue_picture_ul li:first-child {
        color: #aaa;
        font-size: 14px;
        padding: 5px 10px;
    }
    .ue_picture_content {
        border-left: 1px solid #ccc;
        height: 450px;
        padding-left: 30px;
    }

    .picture-list{
        display: inline-block;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 20px;
        margin-bottom: 20px;
        transition: all 0.3s;
        position: relative;
    }
    .picture-list:hover {
        box-shadow: 0 0 15px rgba(0,0,0,0.5);
    }
    .picture-list img{
        width: 100%;
        height: 100%;
    }
    .picture-list .ue_picture_cselected {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        font-size: 24px;
        color: #00cc66;
    }
</style>
<template>
    <UeModal v-model="value" title="插入图片" width="850" @on-confirm="confirm">
        <Row>
            <i-col span="4">
                <ul class="ue_picture_ul">
                    <li>全部图片</li>
                    <li>
                        <Upload
                                ref="upload"
                                :data="uploadParams"
                                :action="uploadAction"
                                name="image"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                accept="image/gif,image/jpeg,image/png"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                multiple>
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                        </Upload>
                    </li>
                </ul>
            </i-col>
            <i-col span="19" offset="1">
                <div class="ue_picture_content">
                    <div class="picture-list" v-for="(item, index) in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.preview" @click.stop="itemSelect(index)">
                            <i v-if="isSelected(index)" class="ue_picture_cselected ivu-icon ivu-icon-checkmark-circled"></i>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage"></Progress>
                            <p style="margin-top: -25px">上传中···</p>
                        </template>
                    </div>
                </div>
            </i-col>
        </Row>
    </UeModal>
</template>
<script>
    import store from '../../store';
    import UeModal from '../../components/modal/ue.vue';

    import Urls from '../../config/urls';
    import ajax from '../../libs/ajax';

    export default {
        props: {
            multiple: true
        },
        components: { UeModal },
        data () {
            return {
                value: false,
                defaultList: [],
                imgName: '',
                visible: false,
                selectedIndexs: [],
                uploadList: [],
            }
        },
        computed: {
            uploadAction () {
                return Urls.API_URL + "/upload/image";
            },
            uploadParams () {
                return {
                    'auth-token': localStorage.getItem('auth_token')
                }
            }
        },
        methods: {
            loadDefaultList () {
                ajax.get('/upload/image').then(function (result) {
                    this.defaultList = result.data;
                    this.$nextTick(function () {
                        this.uploadList = this.$refs.upload.fileList;
                    });
                }.bind(this));
            },
            show () {
                this.defaultList = [];
                this.selectedIndexs = [];
                this.loadDefaultList();
                this.$nextTick(function () {
                    this.value = true;
                });
            },
            confirm () {
                const images = [];
                for (let key in this.selectedIndexs) {
                    const index = this.selectedIndexs[key];
                    images.push(this.uploadList[index].url);
                }
                this.$emit('on-selected', images);
                this.value = false;
            },
            isSelected (index) {
                return this.selectedIndexs.indexOf(index) >= 0;
            },
            itemSelect (index) {
                const sIndex = this.selectedIndexs.indexOf(index);
                if (this.selectedIndexs[sIndex]) {
                    delete this.selectedIndexs.splice(sIndex, 1);
                } else {
                    if (this.multiple) {
                        this.selectedIndexs.push(index);
                    } else {
                        this.selectedIndexs = [index];
                    }
                }
            },
            handleSuccess (res, file) {
                file.name = file.url = res.url;
                file.preview = res.preview;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大。'
                });
            }
        }
    };
</script>