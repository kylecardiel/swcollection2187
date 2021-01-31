export const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
export const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
export const isFirefox = typeof InstallTrigger !== 'undefined';
export const isIE = /*@cc_on!@*/false || !!document.documentMode;
export const isEdge = !isIE && !!window.StyleMedia;