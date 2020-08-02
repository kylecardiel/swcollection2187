export const Styles = {
    colors: {
        blue: '#036bfc',
        yellow: '#fac519',
        darkYellow: '#f2d61b',
        green: 'green',
        grey: 'grey',
        lightGrey: '#aeb2b8',
        white: '#ffffff',
        red: 'red',
        orange: '#fc7303',
        purple: '#9952c4',
        eliteBlackGradient: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(135,135,147,1) 0%, rgba(0,0,0,1) 100%)'
    },
};

export class Color {
    static primary = color => {
        const styledColor = Styles.colors[color];
        return styledColor ? styledColor : 'black';
    }
};