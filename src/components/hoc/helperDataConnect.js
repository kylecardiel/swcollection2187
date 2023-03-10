import { NewVideoGameForm } from 'components/catalog/videoGames/forms/newVideoGameForm';
import React from 'react';
import { connect } from 'react-redux';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import PropTypes from 'prop-types';

export const NewVideoGameFormConnect = ({ setIsModalOpen, item }) => {
    return (<NewVideoGameForm setIsModalOpen={setIsModalOpen} item={item}/>);
};

export const mapStateToProps = state => ({
    formData: getHelperDataSet(state),
});

export default connect(mapStateToProps)(NewVideoGameFormConnect);

NewVideoGameFormConnect.propTypes = {
    setIsModalOpen: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
};