import ajax from '../ajax'


export default {

    editWithKey (obj, id, key) {
        ajax.get('/product/tour/'+id+'/edit?action=keyValue&key='+key).then(function (result) {
            obj.innerHtml = result.data ? result.data :'';
            obj.$refs.ueditor.refreshContent();
        });
    },

    editTrip (obj, id) {
        ajax.get('/product/tour/'+id+'/edit?action=trip').then(function (result) {
            obj.disabled = false;
            obj.days = result.data;
        });
    },

    update (obj, id, data) {
        ajax._update('/product/tour/'+id, data, obj);
    }
}