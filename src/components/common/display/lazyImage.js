import styled, { keyframes } from 'styled-components';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import React from 'react';

export const LazyImage = ({ name, src, alt }) => {
    const refPlaceholder = React.useRef();

    const removePlaceholder = () => {
        refPlaceholder.current.remove();
    };

    return (
        <ImageWrapper>
            <Placeholder ref={refPlaceholder} />
            <LazyLoad>
                <StyledImage
                    onLoad={removePlaceholder}
                    onError={removePlaceholder}
                    src={src}
                    alt={alt}
                />
            </LazyLoad>
        </ImageWrapper>
    );
};

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 47vw;
`;

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAnimation} 1s infinite;
`;

const StyledImage = styled.img`
  position: absolute;
  height: 50%;
  left: 50%;
  top: 25%;
  -webkit-transform: translateY(-50%) translateX(-50%);
`;

LazyImage.propTypes = {
    name: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
};
