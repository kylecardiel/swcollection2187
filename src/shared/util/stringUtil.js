export const capatilizeString = value => value.charAt(0).toUpperCase() + value.slice(1);

export const reverseCamelCase = value => {
    const result = value.replace( /([A-Z])/g, ' $1' );
    return capatilizeString(result);
};

export const slugify = arrayText => {
    let url;
    url = arrayText.map(text => {
        return text 
            ? text.toLowerCase().replace(/ - /g,'-').replace('/','-').replace(/ /g,'-').replace(/[^\w-]+/g,'')
            : null;
    });

    return url.filter(t => t !== null).join('-');
};