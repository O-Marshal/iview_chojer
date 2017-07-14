
export default {

    tableInit (state) {
        state.datas = [];
        state.page = {
            total: 0,
            per_page: 0,
            current_page: 1
        };
    },

    tableIndex (state, result) {
        state.page = result.page;
        state.datas = result.datas;
    },



    tableDestory () {

    }

};