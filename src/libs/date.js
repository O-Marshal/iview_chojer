/**
 * Created by liurong on 2017/6/5.
 */
import dateUtil from 'iview/src/utils/date';

export const toDate = function(date) {
    date = new Date(date);
    if (isNaN(date.getTime())) return null;
    return date;
};

export const formatDate = function(date, format) {
    date = toDate(date);
    if (!date) return '';
    return dateUtil.format(date, format || 'yyyy-MM-dd');
};