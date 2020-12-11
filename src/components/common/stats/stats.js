import { NumberUtils } from 'shared/util/numberUtils';

export const generateStatsBasedOnSource = (data, groupValues, attribute) => {
    let stats = {
        count: data.length,
        totalCost: NumberUtils.formatWithCommas(sumCost(data).toFixed(2)),
        source: [],
    };

    if(groupValues){
        groupValues.values.forEach(({ name }) => {
            stats['source'].push({
                name: name,
                count: data.filter(figure => figure[attribute] === name).length,
                cost:  NumberUtils.formatWithCommas(sumCost(data.filter(figure => figure[attribute] === name)).toFixed(2)),
            });
        });
    }
    return stats;
};

const sumCost = data => {
    return data.reduce((accumulator, e) =>  {
        return parseFloat(e.retailPrice) ? accumulator + parseFloat(e.retailPrice) : accumulator;
    }, 0);
};
