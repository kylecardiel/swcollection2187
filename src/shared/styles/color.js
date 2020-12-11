export class Color {

    static primary = color => {
        const styledColor = Styles.colors[color];
        return styledColor ? styledColor : 'black';
    }

    static black = () => Color.primary('black');
    static blackGradient = () => Color.primary('blackGradient');
    
    static blue = () => Color.primary('blue');
    
    static green = () => Color.primary('green');
    static lightGreen = () => Color.primary('lightGreen');
    static darkGreen = () => Color.primary('darkGreen');

    static grey = () => Color.primary('grey');
    static lightGrey = () => Color.primary('lightGrey');

    static orange = () => Color.primary('orange');
    static purple = () => Color.primary('purple');

    static red = () => Color.primary('red');

    static white = () => Color.primary('white');
    static nearWhite = () => Color.primary('nearWhite');

    static yellow = () => Color.primary('yellow');
    static darkYellow = () => Color.primary('darkYellow');
}

export const Styles = {
    colors: {
        black: 'black',
        blackGradient: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(135,135,147,1) 0%, rgba(0,0,0,1) 100%)',
        blue: '#036bfc',
        // blue: '#027ac0',
        esbBlue: '#0175d6',
        trosBlue: '#47b6cf',
        brown: '#807760',
        tpmBrown: '#ac8d48',
        green: 'green',
        lightGreen: '#98FB98',
        darkGreen: '#388e3c',
        rotjGreen: '#6b9e3f',
        grey: 'grey',
        lightGrey: '#aeb2b8',
        orange: '#fc7303',
        // orange: '#e05f0f',
        purple: '#9952c4',
        rebelsPurple: '#7c2991',
        red: 'red',
        aotcRed: '#c70e1c',
        white: '#ffffff',
        nearWhite: '#ededed',
        yellow: '#fac519',
        darkYellow: '#f2d61b',
        cwYellow: '#d0a91e',
        mandoBrown: '#d49944',
        creditCollection: '#b69b69',
    },
};