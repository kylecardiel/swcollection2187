export const EXTERNAL_LINKS = Object.freeze({
    AMAZON: { 
        NAME: 'Amazon',
        LINK: name => `https://www.amazon.com/s?k=Star+Wars+Black+Series+${name}`,
        RESELLER: false,
        SPACE_REPLACER: '+',
    },
    BEST_BUY: { 
        NAME: 'Best Buy',
        LINK: name => `https://www.bestbuy.com/site/searchpage.jsp?st=star+wars+black+series+${name}&_dyncharset=UTF-8&_dynSessConf=&id=pcat17071&type=page&sc=Global&cp=1&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All+Categories&ks=960&keys=keys`,
        RESELLER: false,
        SPACE_REPLACER: '+',
    },
    DISNEY: { 
        NAME: 'Disney',
        LINK: name => `https://www.shopdisney.com/search?q=star+wars+black+series+${name}&lang=default&isRegSearch=1`,
        RESELLER: false,
        SPACE_REPLACER: '+',
    },
    DORKSIDE: { 
        NAME: 'Dorkside Toys',
        LINK: name => `https://dorksidetoys.com/search?type=product&q=Star+Wars+black+series+${name}`,
        RESELLER: false,
        SPACE_REPLACER: '+',
    },
    EBAY: { 
        NAME: 'Ebay',
        LINK: name => `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1312&_nkw=star+wars+black+series+${name}&_sacat=0`,
        RESELLER: true,
        SPACE_REPLACER: '+',
    },
    GAMESTOP: { 
        NAME: 'Gamestop',
        LINK: name => `https://www.gamestop.com/search/?q=star+wars+black+series+${name}&lang=default`,
        RESELLER: false,
        SPACE_REPLACER: '+',
    },
    MERCARI: { 
        NAME: 'Mercari',
        LINK: name => `https://www.mercari.com/search/?keyword=Star%20Wars%20Black%20Series%20${name}`,
        RESELLER: true,
        SPACE_REPLACER: '%20',
    },
    TARGET: { 
        NAME: 'Target',
        LINK: name =>  `https://www.target.com/s?searchTerm=star+wars+black+series+${name}`,
        RESELLER: false,
        SPACE_REPLACER: '+',
    },
    WALGREENS: { 
        NAME: 'Walgreens',
        LINK: name => `https://www.walgreens.com/search/results.jsp?Ntt=star%20wars%20black%20series%20${name}`,
        RESELLER: false,
        SPACE_REPLACER: '%20',
    },
    WALMART: { 
        NAME: 'Walmart',
        LINK: name =>  `https://www.walmart.com/search/?query=star%20wars%20black%20series%20${name}`,
        RESELLER: false,
        SPACE_REPLACER: '%20',
    },
});