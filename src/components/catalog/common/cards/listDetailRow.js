import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

export const ListDetailRow = ({ list }) => {
    return <>
        {list.sort().map(g => (
            <Typography variant='body2' gutterBottom component='p' key={g}>
                {`- ${g}`}
            </Typography>
        ))}
    </>;
};

ListDetailRow.propTypes = {
    list: PropTypes.array.isRequired,
};
