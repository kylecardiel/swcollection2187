import PropTypes from 'prop-types';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const Recaptcha = ({ onChange }) => {
    return (
        <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onChange}
        />
    );
};

Recaptcha.propTypes = {
    onChange: PropTypes.func,
};
