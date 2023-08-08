const defaultOverlayStyles = {
    backgroundColor: 'rgb(120, 119, 119, 0.9)',
    transition: 'opacity 2000ms ease-in-out',
};

const defaultContentStyleOverride = {
    color: 'black',
    width: '40%',
    height: 650,
    position: 'absolute',
    float: 'left',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2) 0 6px 20px 0 rbga(0, 0, 0, 0.19)',
    padding: 0,
    border: 0,
    borderRadius: 0,
    overflow: 'hidden',
};

export const modalStyles = (contentStyleOverride, overlayStylesOverride) => {
    return {
        overlay: Object.assign({}, defaultOverlayStyles, overlayStylesOverride || {}),
        content: Object.assign({}, defaultContentStyleOverride, contentStyleOverride || {}),
    };
};

export const getModalSize = isMobileDevice => {
    return isMobileDevice ? largerModal : smallerModal;
};

const smallerModal = {
    height: '75%',
    width: '70%',
};

const largerModal = {
    height: '90%',
    width: '95%',
};

export const fitlerModalSizes = screenSize => {
    if(screenSize.isLargeDesktopOrLaptop){
        return { height: '75%', width: '50%' };
    } else if (screenSize.isMediumDesktopOrLaptop) {
        return { height: '80%', width: '50%' };
    } else if (screenSize.isTablet && !screenSize.isMobileDevice) {
        return screenSize.isPortrait ? { height: '80%', width: '80%' } : { height: '80%', width: '75%' };
    } else {
        return { height: '100%', width: '100%' };
    }
};