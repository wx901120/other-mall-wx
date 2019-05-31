import moment from 'moment';
moment.locale('zh-cn');

export function capitalizeDate(val) {
    if (val) {
        if (typeof val === 'string') {
            return moment(new Date(parseInt(val) * 1000)).format('YYYY.MM.DD');
        } else if (typeof val === 'object') {
            return moment(val).format('YYYY.MM.DD');
        }
    } else {
        return '';
    }

}
export function capitalizeDate2(value) {
    if (!value) return '';
    return new Date(parseInt(value) * 1000).toLocaleDateString().split("/").join('-');
}
export function capitalizeDate3(value) {
    if (!value) return '';
    return new Date(parseInt(value) * 1000).toLocaleString();
}