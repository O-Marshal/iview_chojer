<template>
    <div>
        <img :src="imageSrc" :style="imageStyle" @click.stop="showSelectImageForm">
        <p style="text-align: center; margin-top: 15px">封面图</p>
        <ImagePick ref="imagePick" @on-selected="onImageSelected"></ImagePick>
    </div>
</template>
<script>

    import ImagePick from '../editor/picture.vue';

    export default {
        props: {
            size: Number,
            value: {
                type: String,
                default: null
            }
        },
        components: { ImagePick },
        computed: {
            imageStyle () {
                return {
                    display: 'block',
                    margin: 'auto',
                    cursor: 'pointer',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    width: (this.size * 3) + 'px',
                    height: (this.size * 2) + 'px',
                };
            },
            imageSrc () {
                return this.value ? (this.value + '/300x200') : '';
            }
        },
        methods: {
            showSelectImageForm () {
                this.$refs['imagePick'].show();
            },
            onImageSelected (image) {
                this.$emit('input', image[0]);
            }
        }
    };
</script>