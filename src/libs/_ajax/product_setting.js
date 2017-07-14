import json from '../json'
import ajax from '../ajax'


export default {

    // 发布团期， 获取价格模板
    priceTourTempGet (obj, product_id) {
        ajax.get('/product/setting/temp/price/team/' + product_id).then(function (result) {
            obj.disabledDates = result.data.disable_dates;
            obj.priceGroups = result.data.groups;
            obj.$refs.datePane.resetDate();
        });
    }
}