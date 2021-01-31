
export class Browser {
    static isChrome = () => {
        return !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    }

    static isSafari = () => {
        return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    }

    static isFirefox = () => {
        return typeof InstallTrigger !== 'undefined'; 
    }

    static isIE = () => {
        return /*@cc_on!@*/false || !!document.documentMode;
    }


    static isEdge = () => {
        return !Browser.isIE() && !!window.StyleMedia;
    }
}