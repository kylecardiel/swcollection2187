export const generateStatsBasedOnSource = (data, groupValues, attribute) => {
    let stats = {
        count: data.length,
        source: [],
    };

    if(groupValues){
        groupValues.values.forEach(source => {
            stats['source'].push({
                name: source,
                count: data.filter(figure => figure[attribute] === source).length
            })
        });
    }

    return stats
}