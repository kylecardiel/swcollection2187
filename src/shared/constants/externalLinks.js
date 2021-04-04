export const EXTERNAL_LINKS = Object.freeze({
    AMAZON: { 
        NAME: 'Amazon',
        LINK: name => `https://www.amazon.com/s?k=Star+Wars+Black+Series+${name}`,
        SECONDARY_RETAILER: false,
    },
    BEST_BUY: { 
        NAME: 'Best Buy',
        LINK: 'https://www.bestbuy.com/',
        SECONDARY_RETAILER: false,
    },
    DISNEY: { 
        NAME: 'Disney',
        LINK: 'https://www.disneystore.com/',
        SECONDARY_RETAILER: false,
    },
    DORKSIDE: { 
        NAME: 'Dorkside Toys',
        LINK: 'https://www.dorksidetoys.com/',
        SECONDARY_RETAILER: false,
    },
    EBAY: { 
        NAME: 'Ebay',
        LINK: 'https://www.ebay.com/',
        SECONDARY_RETAILER: true,
    },
    GAMESTOP: { 
        NAME: 'Gamestop',
        LINK: 'https://www.gamestop.com/',
        SECONDARY_RETAILER: false,
    },
    MERCARI: { 
        NAME: 'Mercari',
        LINK: name => `https://www.mercari.com/search/?keyword=Star%20Wars%20Black%20Series%20${name}`,
        SECONDARY_RETAILER: true,
    },
    TARGET: { 
        NAME: 'Target',
        LINK: name =>  `https://www.target.com/s?searchTerm=star+wars+black+series+${name}`,
        SECONDARY_RETAILER: false,
    },
    WALGREENS: { 
        NAME: 'Walgreens',
        LINK: 'https://www.walgreens.com/',
        SECONDARY_RETAILER: false,
    },
    WALMART: { 
        NAME: 'Walmart',
        LINK: name =>  `https://www.walmart.com/search/?query=star%20wars%20black%20series%20${name}`,
        SECONDARY_RETAILER: false,
    },
});