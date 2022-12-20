import moment from 'moment';
export class SortingUtils {

    static sortDataByAttributeDesc = (data, attribute) => {
        return data.sort((a, b) => (a[attribute] < b[attribute]) ? 1 : -1);
    };

    static sortDataByAttributeAsc = (data, attribute) => {
        return data.sort((a, b) => (a[attribute] > b[attribute]) ? 1 : -1);
    };

    static sortDataByStringIntAsc = (data, attribute) => {
        return data.sort((a, b) => (SortingUtils.alphaNumericSorting(a[attribute], b[attribute])));
    };

    static alphaNumericSorting = (a, b) => {
        const regex = /^([a-z]*)(\d*)/i;
        let _a = a.match(regex);
        let _b = b.match(regex);
        if (_a[1] < _b[1]) return -1;
        if (_a[1] > _b[1]) return 1;
        let _n = parseInt(_a[2]) - parseInt(_b[2]);
        if (_n === 0){
            return SortingUtils.alphaNumericSorting(a.substr(_a[0].length), b.substr(_b[0].length));
        }   
        return _n;
    };

    static convertArrayTo2dMatrix = (list, elementsPerSubArray) => {
        let matrix = [], i, k;
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
            matrix[k].push(list[i]);
        }
        return matrix;
    }; 

    static sortDateDescending = dates => {
        return dates.sort((a,b) => new moment(b.createdDate) - new moment(a.createdDate));
    };
}