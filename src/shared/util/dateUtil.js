import moment from 'moment';

export class DateUtils {

    static defaultFormat = 'MMM DD, YYYY HH:mm:ss';

    static getCurrentTimestamp = (format = DateUtils.defaultFormat) => {
        return moment().format(format);
    };

    static formatDateFromInput = inputDate => {
        return moment(inputDate, 'ddd MMM DD YYYY HH:mm:ss').format('YYYY-MM-DD');
    };

    static formatDateToInput = inputDate => {
        return moment(inputDate, 'YYYY-MM-DD').format('ddd MMM DD YYYY HH:mm:ss');
    };

    static formatDateFromFB = inputDate => {
        return moment(inputDate, 'YYYY-MM-DD').format('ddd MMM DD, YYYY');
    };

    static formatTimestamp = timeStamp => {
        return moment(timeStamp, DateUtils.defaultFormat).format('YYYY-MM-DD');
    };
}