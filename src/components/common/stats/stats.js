export const generateStatsBasedOnSource = (data, groupValues, attribute) => {
    
    let stats = {
        count: data.length,
        totalCost: sumCost(data),
        source: [],
    };

    if(groupValues){
        groupValues.values.forEach(({ name }) => {
            stats['source'].push({
                name: name,
                count: data.filter(figure => figure[attribute] === name).length,
                cost: sumCost(data.filter(figure => figure[attribute] === name)),
            });
        });
    }

    return stats
};

const sumCost = data => {
    return data.reduce((accumulator, e) =>  {
        return parseFloat(e.retailPrice) ? accumulator + parseFloat(e.retailPrice) : accumulator;
      }, 0);
};