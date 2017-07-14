<style scoped>

</style>
<template>
    <Layout>
        <Tabs value="name1">
            <Tab-pane label="旅游线路" name="name1">
                <TourForm></TourForm>
            </Tab-pane>
            <Tab-pane label="机票" name="name2">
                <PlaneForm></PlaneForm>
            </Tab-pane>
            <Tab-pane label="酒店" name="name3">
                <HotelForm></HotelForm>
            </Tab-pane>
            <Tab-pane label="门票" name="name4">
                <TicketForm></TicketForm>
            </Tab-pane>
            <Tab-pane label="签证" name="name5">
                <VisaForm></VisaForm>
            </Tab-pane>
            <Tab-pane label="租车" name="name6">
                <CarForm></CarForm>
            </Tab-pane>
        </Tabs>
    </Layout>
</template>
<script>
    import Layout from '../../components/layout/console.vue'
    import TourForm from './push/tour.vue'
    import PlaneForm from './push/plane.vue'
    import HotelForm from './push/hotel.vue'
    import TicketForm from './push/ticket.vue'
    import VisaForm from './push/visa.vue'
    import CarForm from './push/car.vue'

    export default {
        data () {
            return {
                self: this,
                value: false,
                loading: false,
                index: -1,
                tabActive: 'article',
                tabs: {
                    'article': {
                        buttonLabel: '发布到文章'
                    },
                    'log': {
                        buttonLabel: '发布到日志'
                    },
                    'doc': {
                        buttonLabel: '发布到文档'
                    }
                },
                push: {
                    buttonLabel: '发布到文章'
                },
                article: {
                    tags: ['标签0', '标签1', '标签2']
                }
            };
        },
        components: { Layout, TourForm, PlaneForm, HotelForm, CarForm, TicketForm, VisaForm },
        methods: {
            onTagEnter (val, a) {
                this.article.tags.push(val)
            },
            onTagClose (e, index) {
                this.article.tags.splice(index, 1);
            }
        },
        watch: {
            tabActive (val) {
                this.push = this.tabs[val];
            }
        }
    };
</script>