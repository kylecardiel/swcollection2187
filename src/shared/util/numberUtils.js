export class NumberUtils {
    static formatWithCommas = number => {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
}