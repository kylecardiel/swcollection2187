export const Styles = {
    colors: {
        blue: '#1b6ef5',
        yellow: '#fac519',
        green: 'green',
        grey: 'grey',
        lightGrey: '#aeb2b8',
        white: '#ffffff',
        eliteRed: '#d60002',
        eliteRedGradient: 'radial-gradient(circle, rgba(214,0,2,1) 0%, rgba(125,40,40,1) 50%, rgba(214,0,2,1) 100%)',
        eliteBlackGradient: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(135,135,147,1) 0%, rgba(0,0,0,1) 100%)'
    },
};

export class Color {
    static primary = color => {
        const styledColor = Styles.colors[color];
        return styledColor ? styledColor : 'black';
    }
};