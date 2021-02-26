export const capatilizeString = value => value.charAt(0).toUpperCase() + value.slice(1);

export const reverseCamelCase = value => {
    const result = value.replace( /([A-Z])/g, ' $1' );
    return capatilizeString(result);
};