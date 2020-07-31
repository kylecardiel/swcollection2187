export const generateStatsBasedOnSource = (data, groupValues, attribute) => {
    
    let stats = {
        count: data.length,
        totalCost: sumCost(data),
        source: [],
    };

    if(groupValues){
        groupValues.values.forEach(source => {
            stats['source'].push({
                name: source,
                count: data.filter(figure => figure[attribute] === source).length,
                cost: sumCost(data.filter(figure => figure[attribute] === source)),
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