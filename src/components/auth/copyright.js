import Typography from '@material-ui/core/Typography';
import React from 'react';
import { CLUB_CONSTANTS } from 'shared/constants/clubConstants';
// import Link from '@material-ui/core/Link';
// import { createMuiTheme } from '@material-ui/core/styles';
// import red from '@material-ui/core/colors/red';

// const theme = createMuiTheme({
//   palette: {
//     primary: red,
//     secondary: {
//       main: '#f44336',
//     },
//   },
// });


export function Copyright() {
    return (
      <Typography variant='body2' align='center'>
        {'Copyright © '}
        {new Date().getFullYear()}
        {CLUB_CONSTANTS.CLUB_NAME.FULL_NAME}
        <Link theme={theme} href={CLUB_CONSTANTS.CLUB_WEBSITE}>
           {CLUB_CONSTANTS.CLUB_NAME.FULL_NAME}
        </Link> 
      </Typography>
    );
  }