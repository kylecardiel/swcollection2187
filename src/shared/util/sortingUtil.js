export class SortingUtils {

    static TimesheetEntriesByDateDesc = entries => {
        return SortingUtils.sortDataByAttributeDesc(entries, 'date');
    }

    static sortDataByAttributeDesc = (data, attribute) => {
        return data.sort((a, b) => (a[attribute] < b[attribute]) ? 1 : -1);
    }

    static sortDataByAttributeAsc = (data, attribute) => {
        return data.sort((a, b) => (a[attribute] > b[attribute]) ? 1 : -1);
    }

    static sortDataByStringIntAsc = (data, attribute) => {
        return data.sort((a, b) => (SortingUtils.alphaNumericSorting(a[attribute], b[attribute])));
    }

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
    }
}